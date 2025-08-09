/* ===========
   Small, framework-free JS for:
   - Mobile menu toggle
   - Smooth scrolling (with sticky-header offset)
   - Dark/Light mode toggle with persistence
   =========== */

// Cache selectors
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');
const themeToggle = document.getElementById('themeToggle');
const yearSpan = document.getElementById('year');

// 1) Mobile menu toggle
if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked (handy on mobile)
  navList.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// 2) Smooth scrolling with sticky-header offset
const header = document.querySelector('.site-header');
const headerHeight = () => (header ? header.offsetHeight : 0);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight() - 8;
    window.scrollTo({ top, behavior: 'smooth' });

    // Update the hash without a hard jump
    history.pushState(null, '', id);
  });
});

// 3) Theme toggle (simplified: light ↔ dark)
const root = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme'); // 'light' | 'dark' | null
if (savedTheme === 'light' || savedTheme === 'dark') {
  root.setAttribute('data-theme', savedTheme);
} else {
  root.setAttribute('data-theme', 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// 4) Footer year
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
