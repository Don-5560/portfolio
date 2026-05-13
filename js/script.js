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



// ===== FLOATING CTA =====
const floatCta = document.getElementById('float-cta');
if (floatCta) {
  const hero = document.getElementById('home');
  window.addEventListener('scroll', () => {
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 400;
    floatCta.classList.toggle('visible', heroBottom < 0);
  }, { passive: true });
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
if (header) {
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    header.classList.toggle('scrolled', currentY > 60);
    if (window.innerWidth < 768) {
      if (currentY > lastY && currentY > 60) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
    }
    lastY = currentY;
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
