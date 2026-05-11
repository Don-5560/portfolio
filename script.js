// ===== LOADER =====
const loader     = document.getElementById('loader');
const loaderFill = document.getElementById('loader-fill');
const loaderPct  = document.getElementById('loader-pct');

if (loader && loaderFill && loaderPct) {
  let progress = 0;
  const loaderInterval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      loaderFill.style.width = '100%';
      loaderPct.textContent  = '100%';
      setTimeout(revealSite, 400);
    } else {
      loaderFill.style.width = progress + '%';
      loaderPct.textContent  = Math.floor(progress) + '%';
    }
  }, 80);

  function revealSite() {
    loader.classList.add('hide');
    document.body.classList.remove('loading');
    triggerHeroAnimations();
    setTimeout(() => loader.remove(), 1000);
  }
} else {
  document.body.classList.remove('loading');
}

// ===== HERO ANIMATIONS =====
function triggerHeroAnimations() {
  document.querySelectorAll('.hero-line').forEach(el => el.classList.add('visible'));
  setTimeout(() => document.querySelector('.hero-sub')?.classList.add('visible'), 200);
  setTimeout(() => document.querySelector('.hero-btns')?.classList.add('visible'), 400);
}

// ===== CUSTOM CURSOR (desktop only) =====
const ring = document.getElementById('cursor-ring');
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

if (ring && !isTouchDevice()) {
  let ringX = 0, ringY = 0, curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    curX = e.clientX;
    curY = e.clientY;
  });

  (function animateRing() {
    ringX += (curX - ringX) * 0.12;
    ringY += (curY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
} else if (ring) {
  ring.style.display = 'none';
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== SCROLL REVEALS =====
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObs.observe(el);
});

// ===== CARD SHINE =====
document.querySelectorAll('.tilt-card').forEach(card => {
  const shine = card.querySelector('.card-shine');
  if (!shine) return;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    shine.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    shine.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
  });
});
