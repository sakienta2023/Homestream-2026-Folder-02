/* =========================================================
   HOMESTREAM PLUS — Shared Scripts
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky nav on scroll ── */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── Mobile nav toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      drawer.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active nav link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });
});
