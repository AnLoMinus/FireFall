/* FireFall Particles Engine
   Timestamp: 2025-10-30T14:45+02:00 | כ"ח תשרי תשפ"ו
   Credits: AnLoMinus • FireFall (FF) • RepoCraft (RC)
*/

const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d", { alpha: true });

let particles = [];
const MAX_PARTICLES = 120; // כמות גיצים באוויר

// הגדרת גודל קנבס דינמית
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// מייצר חלקיק יחיד 🔥
function spawnParticle() {
  const x = Math.random() * canvas.width;
  const y = canvas.height + Math.random() * 40; // קצת מתחת לשוליים
  const size = Math.random() * 2 + 1;
  const speedY = 0.5 + Math.random() * 1.5;
  const life = 60 + Math.random() * 60; // פריימים
  const flicker = Math.random() * 0.4 + 0.6;

  return {
    x,
    y,
    size,
    speedY,
    life,
    maxLife: life,
    flicker
  };
}

// ציור חלקיק יחיד (זוהר לוהט) 🩸🔥
function drawParticle(p) {
  const lifeRatio = p.life / p.maxLife; // 1 -> 0
  const alpha = lifeRatio * 0.8 * p.flicker;

  // גוון אדום-כתום
  const grad = ctx.createRadialGradient(
    p.x,
    p.y,
    0,
    p.x,
    p.y,
    p.size * 4
  );
  grad.addColorStop(0, `rgba(255,200,150,${alpha})`);
  grad.addColorStop(0.3, `rgba(255,120,40,${alpha * 0.8})`);
  grad.addColorStop(1, `rgba(0,0,0,0)`);

  ctx.beginPath();
  ctx.fillStyle = grad;
  ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
  ctx.fill();
}

// מעדכן חלקיק ✨
function updateParticle(p) {
  p.y -= p.speedY; // עולה למעלה כמו עשן לוהט
  p.x += (Math.random() - 0.5) * 0.3; // ריצוד קל לצדדים
  p.life -= 1;
}

// לולאת האנימציה 🎥
function animate() {
  requestAnimationFrame(animate);

  // לטשטש עקבות (זנב חום)
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // יוצרים חלקיקים חדשים עד התקרה
  if (particles.length < MAX_PARTICLES) {
    particles.push(spawnParticle());
  }

  // מעדכנים ומציירים את כולם
  particles.forEach((p, idx) => {
    updateParticle(p);
    drawParticle(p);

    // מסירים חלקיקים "מתים"
    if (p.life <= 0 || p.y < canvas.height * 0.2) {
      particles[idx] = spawnParticle();
    }
  });
}

animate();
