const siteMenuSlot = document.querySelector('.site-nav-slot');
const siteMenu = siteMenuSlot.querySelector('.site-nav');
const siteMenuTop = 8;

function updatePinnedMenu() {
  siteMenuSlot.classList.toggle('is-pinned', siteMenuSlot.getBoundingClientRect().top <= siteMenuTop);
}

function reserveMenuSpace() {
  const height = Math.ceil(siteMenu.getBoundingClientRect().height);
  siteMenuSlot.style.setProperty('--site-menu-height', height + 'px');
  document.documentElement.style.setProperty('--site-menu-offset', height + siteMenuTop + 12 + 'px');
  updatePinnedMenu();
}

siteMenuSlot.style.setProperty('--site-menu-top', siteMenuTop + 'px');
reserveMenuSpace();
window.addEventListener('scroll', updatePinnedMenu, {passive: true});
if (typeof ResizeObserver === 'function') {
  new ResizeObserver(reserveMenuSpace).observe(siteMenu);
}
