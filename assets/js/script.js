const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const mobileMenuButton = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = [...document.querySelectorAll('.mobile-nav a')];
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const projectCards = [...document.querySelectorAll('.project-card')];
const reveals = [...document.querySelectorAll('.reveal')];

function setActiveNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) setActiveNav(entry.target.id);
  });
}, { rootMargin: '-42% 0px -50% 0px', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

function closeMobileNav() {
  mobileNav?.classList.remove('open');
  mobileMenuButton?.setAttribute('aria-expanded', 'false');
  mobileNav?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

mobileMenuButton?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  mobileMenuButton.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
});

mobileNavLinks.forEach((link) => link.addEventListener('click', closeMobileNav));

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      const matches = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !matches);
    });
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.08 });

reveals.forEach((item) => revealObserver.observe(item));

document.querySelector('#year').textContent = new Date().getFullYear();
