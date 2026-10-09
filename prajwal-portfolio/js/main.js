// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Navbar shrink on scroll + active link highlight =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}, { passive: true });

// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  navMenu.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
});
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuToggle.classList.remove('open');
  navMenu.classList.remove('open');
}));

// ===== Typing effect =====
const roles = ['Data Analyst', 'SQL Developer', 'Power BI Storyteller', 'Machine Learning Enthusiast'];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const word = roles[roleIndex];
  typedEl.textContent = deleting ? word.slice(0, --charIndex) : word.slice(0, ++charIndex);

  let delay = deleting ? 50 : 110;
  if (!deleting && charIndex === word.length) { delay = 1800; deleting = true; }
  else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Animated counters =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ===== Skill filter =====
const chips = document.querySelectorAll('.chip');
const skillCards = document.querySelectorAll('.skill-card');

chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const filter = chip.dataset.filter;

  skillCards.forEach(card => {
    const show = filter === 'all' || card.dataset.cat === filter;
    card.classList.toggle('hide', !show);
  });
}));

// ===== Project tag filter (optional hook) =====
// Project cards carry data-tags; add filter chips here if you want to extend the portfolio.

// ===== Cursor glow follows mouse =====
const glow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

function animateGlow() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  glow.style.left = glowX + 'px';
  glow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();
