const siteHeader = document.querySelector('.site-header');

function reserveHeaderSpace() {
  const offset = Math.ceil(siteHeader.getBoundingClientRect().height) + 12;
  document.documentElement.style.setProperty('--site-header-offset', offset + 'px');
}

reserveHeaderSpace();
if (typeof ResizeObserver === 'function') {
  new ResizeObserver(reserveHeaderSpace).observe(siteHeader);
}
