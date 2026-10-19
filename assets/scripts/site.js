document.documentElement.classList.add('js-ready');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
function closeMenu() { nav?.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded', 'false'); }
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
// The small update package previews locally; full-size originals stay on the existing site.
if (location.protocol === 'file:') {
  document.querySelectorAll('a[data-original]').forEach(a => {
    a.href = 'https://www.lindalavid.com/' + a.dataset.original;
    a.removeAttribute('download'); a.target = '_blank'; a.rel = 'noopener';
  });
}
const search = document.querySelector('#art-search');
const cards = [...document.querySelectorAll('.artwork')];
const empty = document.querySelector('.gallery-empty');
const count = document.querySelector('[data-result-count]');
search?.addEventListener('input', () => {
  const query = search.value.trim().toLocaleLowerCase();
  cards.forEach(card => { card.hidden = !card.dataset.title.toLocaleLowerCase().includes(query); });
  const visible = cards.filter(card => !card.hidden).length;
  count.textContent = `${visible} of ${cards.length} artworks`;
  empty.hidden = visible > 0;
});
const dialog = document.querySelector('#art-viewer');
if (dialog && typeof dialog.showModal === 'function') {
  let active = 0;
  let items = [];
  let origin = null;
  const title = dialog.querySelector('#viewer-title');
  const img = dialog.querySelector('.lightbox-image');
  const download = dialog.querySelector('.viewer-download');
  const status = dialog.querySelector('.lightbox-status');
  function show(index) {
    active = (index + items.length) % items.length;
    const link = items[active];
    title.textContent = link.dataset.title;
    img.src = link.href; img.alt = link.dataset.title;
    download.href = location.protocol === 'file:' ? 'https://www.lindalavid.com/' + link.dataset.source : link.dataset.source;
    if (location.protocol === 'file:') { download.removeAttribute('download'); download.target = '_blank'; download.rel = 'noopener'; }
    else { download.setAttribute('download', ''); download.removeAttribute('target'); }
    status.textContent = `${active + 1} / ${items.length}`;
  }
  document.querySelectorAll('[data-lightbox]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); origin = link;
    items = [...document.querySelectorAll('.artwork:not([hidden]) [data-lightbox]')];
    show(items.indexOf(link)); dialog.showModal(); document.body.classList.add('dialog-open');
  }));
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-prev]').addEventListener('click', () => show(active - 1));
  dialog.querySelector('[data-next]').addEventListener('click', () => show(active + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(active + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(active - 1); }
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); origin?.focus(); });
}
