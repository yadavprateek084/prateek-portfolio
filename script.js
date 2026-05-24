/* ══════════════════════════════════════════
   Prateek Yadav — Portfolio JavaScript
   ══════════════════════════════════════════ */

/* ── THEME TOGGLE ── */
const themeBtn = document.getElementById('themeToggle');
const html = document.documentElement;
let dark = true;

themeBtn.addEventListener('click', () => {
  dark = !dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeBtn.textContent = dark ? '☀' : '🌙';
});

/* ── HAMBURGER / MOBILE MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

/* ── TYPING ANIMATION ── */
const phrases = [
  "Transforming raw data into actionable business insights.",
  "SQL queries that uncover hidden revenue patterns.",
  "Power BI dashboards that drive executive decisions.",
  "Detail-oriented analyst with a bias for impact."
];

let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const cur = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ++cIdx);
    if (cIdx === cur.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    typedEl.textContent = cur.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 35 : 55);
}

type();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.05) + 's';
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── SKILL BARS (animate on scroll) ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fills = e.target.querySelectorAll('.skill-fill');
      fills.forEach(f => {
        f.style.transform = `scaleX(${f.dataset.w})`;
        f.classList.add('animated');
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(c => skillObserver.observe(c));

/* ── NAV BORDER ON SCROLL ── */
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.borderBottomColor =
    window.scrollY > 20 ? 'var(--border)' : 'transparent';
});

/* ── CONTACT FORM SUBMIT (placeholder) ── */
const sendBtn = document.querySelector('.contact-form .btn-primary');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name  = document.querySelector('.contact-form .form-input[placeholder="Your name"]').value.trim();
    const email = document.querySelector('.contact-form .form-input[type="email"]').value.trim();
    const msg   = document.querySelector('.contact-form .form-textarea').value.trim();

    if (!name || !email || !msg) {
      sendBtn.textContent = 'Please fill all fields!';
      sendBtn.style.background = 'rgba(255,100,100,.2)';
      setTimeout(() => {
        sendBtn.textContent = 'Send Message →';
        sendBtn.style.background = '';
      }, 2000);
      return;
    }

    sendBtn.textContent = 'Message Sent ✓';
    sendBtn.style.background = 'linear-gradient(135deg,#22d3a0,#1ab88a)';
    setTimeout(() => {
      sendBtn.textContent = 'Send Message →';
      sendBtn.style.background = '';
    }, 3000);
  });
}
