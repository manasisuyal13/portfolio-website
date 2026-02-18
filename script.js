/* ═══════════════════════════════════════
   MANASI SUYAL — script.js
   ═══════════════════════════════════════ */

// ── PARTICLE CANVAS ─────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: -999, y: -999 };
  const COUNT = 70;
  const COLORS = ['rgba(0,212,255,', 'rgba(0,255,204,', 'rgba(157,107,255,', 'rgba(255,110,180,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: randBetween(0.8, 2.5),
      dx: randBetween(-0.25, 0.25),
      dy: randBetween(-0.35, -0.08),
      alpha: randBetween(0.2, 0.8),
      dAlpha: randBetween(-0.003, 0.003),
      color,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(createParticle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const a = (1 - dist / 130) * 0.08;
          ctx.strokeStyle = `rgba(0,212,255,${a})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();

    for (const p of particles) {
      p.pulse += 0.02;
      const r = p.r + Math.sin(p.pulse) * 0.5;

      // Mouse repulsion
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 120) {
        p.x += (mdx / mdist) * 0.6;
        p.y += (mdy / mdist) * 0.6;
      }

      p.x += p.dx;
      p.y += p.dy;
      p.alpha += p.dAlpha;
      if (p.alpha < 0.1 || p.alpha > 0.9) p.dAlpha *= -1;

      if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;

      // Draw glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
      grad.addColorStop(0, p.color + p.alpha + ')');
      grad.addColorStop(1, p.color + '0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (p.alpha * 1.2).toFixed(2) + ')';
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  resize();
  initParticles();
  animate();

  // Dim particles in light mode
  const obs = new MutationObserver(() => {
    canvas.style.opacity = document.body.classList.contains('light-mode') ? '0.15' : '0.6';
  });
  obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();


// ── CUSTOM CURSOR ────────────────────────────
(function initCursor() {
  const orb = document.getElementById('cursorOrb');
  const dot = document.getElementById('cursorDot');
  if (!orb || !dot) return;

  let ox = 0, oy = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + 'px';
    dot.style.top  = ty + 'px';
  });

  (function loop() {
    ox += (tx - ox) * 0.12;
    oy += (ty - oy) * 0.12;
    orb.style.left = ox + 'px';
    orb.style.top  = oy + 'px';
    requestAnimationFrame(loop);
  })();

  // Expand cursor on interactive elements
  document.querySelectorAll('a, button, .tool-icon, .project-card, .info-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-expand'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-expand'));
  });
})();


// ── THEME TOGGLE ─────────────────────────────
function toggleMode() {
  const body = document.body;
  const icon = document.getElementById('themeIcon');
  body.classList.toggle('light-mode');
  icon.textContent = body.classList.contains('light-mode') ? '🌙' : '🌞';
}


// ── TYPED.JS ─────────────────────────────────
new Typed('#element', {
  strings: [
    'Software Engineer \u{1F680}',      // 🚀
    'B.Tech Graduate \u{1F393}',        // 🎓
    'AI/ML Enthusiast \u{1F916}',       // 🤖
    'Web Developer \u{1F4BB}',          // 💻
    'Data Analytics Buff \u{1F4CA}',    // 📊
    'Python & SQL Learner \u{1F40D}',   // 🐍
  ],
  typeSpeed: 46,
  backSpeed: 26,
  backDelay: 1400,
  loop: true,
  showCursor: false,
  contentType: 'html',
});




// ── SCROLL REVEAL ────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...(entry.target.parentElement?.querySelectorAll('.reveal') ?? [])];
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = `${idx * 0.1}s`;
    entry.target.classList.add('visible');
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObs.observe(el));


// ── NAV ACTIVE HIGHLIGHT ─────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${entry.target.id}`) {
        link.style.color = 'var(--cyan)';
      }
    });
  });
}, { threshold: 0.45 });

sections.forEach(s => navObs.observe(s));


// ── HEADER SCROLL SHRINK ─────────────────────
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.style.padding = '12px 56px';
    header.style.background = 'rgba(5,8,16,0.85)';
  } else {
    header.style.padding = '';
    header.style.background = '';
  }
}, { passive: true });


// ── PROJECT DRAG SCROLL ──────────────────────
(function initDragScroll() {
  const track = document.getElementById('projectsTrack');
  if (!track) return;

  let isDown = false, startX, scrollLeft;

  track.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  document.addEventListener('mouseup', () => { isDown = false; });
  track.addEventListener('mouseleave', () => { isDown = false; });

  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.3;
  });

  // Touch support
  let touchStartX, touchScrollLeft;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX;
    track.scrollLeft = touchScrollLeft - (x - touchStartX);
  }, { passive: true });
})();