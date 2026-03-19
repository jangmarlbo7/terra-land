// public/js/home.js — Homepage logic (all 9 sections)

let allLands = [];
let showAll  = false;

// ── Boot ──
document.addEventListener('DOMContentLoaded', async () => {
  Lang.applyAll();
  await loadLands();
  renderHero();
  renderSearch();
  renderListings();
  renderCategories();
  renderWhyUs();
  renderHowItWorks();
  renderMap();

  document.addEventListener('langchange', () => {
    Lang.applyAll();
    renderHero();
    renderSearch();
    renderListings();
    renderCategories();
    renderWhyUs();
    renderHowItWorks();
    renderMap();
  });

  // smooth-scroll nav
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});

// ── Load ──
async function loadLands() {
  try {
    allLands = await API.getLands({ status: 'available', lang: Lang.get() });
  } catch (e) {
    console.error('Failed to load lands:', e.message);
    allLands = [];
  }
}

// ─────────────────────────────────────────────────────────
// 1. HERO stats
// ─────────────────────────────────────────────────────────
function renderHero() {
  const el = id => document.getElementById(id);
  if (el('stat-plots')) el('stat-plots').textContent = allLands.length || '120+';
}

// ─────────────────────────────────────────────────────────
// 2. SEARCH section
// ─────────────────────────────────────────────────────────
function renderSearch() {
  const sel = id('sf-type');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = `
    <option value="">${Lang.t('sf_all')}</option>
    <option value="agricultural">${Lang.t('t_agricultural')}</option>
    <option value="residential">${Lang.t('t_residential')}</option>
    <option value="commercial">${Lang.t('t_commercial')}</option>
    <option value="industrial">${Lang.t('t_industrial')}</option>
    <option value="forest">${Lang.t('t_forest')}</option>
    <option value="roadside">${Lang.t('t_roadside')}</option>
    <option value="investment">${Lang.t('t_investment')}</option>
    <option value="empty">${Lang.t('t_empty')}</option>
  `;
  sel.value = cur;

  // price options
  const psel = id('sf-price');
  if (psel) {
    const pv = psel.value;
    psel.innerHTML = `
      <option value="">${Lang.t('price_all')}</option>
      <option value="1">${Lang.t('price_1')}</option>
      <option value="5">${Lang.t('price_5')}</option>
      <option value="10">${Lang.t('price_10')}</option>
      <option value="99">${Lang.t('price_99')}</option>
    `;
    psel.value = pv;
  }

  // size options
  const ssel = id('sf-size');
  if (ssel) {
    const sv = ssel.value;
    ssel.innerHTML = `
      <option value="">${Lang.t('size_all')}</option>
      <option value="s">${Lang.t('size_s')}</option>
      <option value="m">${Lang.t('size_m')}</option>
      <option value="l">${Lang.t('size_l')}</option>
      <option value="xl">${Lang.t('size_xl')}</option>
    `;
    ssel.value = sv;
  }
}

function doSearch() {
  const loc   = (id('sf-loc')?.value   || '').toLowerCase().trim();
  const price = id('sf-price')?.value  || '';
  const type  = id('sf-type')?.value   || '';

  showAll = true;

  const filtered = allLands.filter(l => {
    const locMatch  = !loc  || Lang.field(l, 'location').toLowerCase().includes(loc)
                             || Lang.field(l, 'title').toLowerCase().includes(loc);
    const typeMatch = !type || l.type === type;
    let priceMatch  = true;
    if (price === '1')  priceMatch = l.price < 1000000;
    if (price === '5')  priceMatch = l.price >= 1000000 && l.price < 5000000;
    if (price === '10') priceMatch = l.price >= 5000000 && l.price < 10000000;
    if (price === '99') priceMatch = l.price >= 10000000;
    return locMatch && typeMatch && priceMatch;
  });

  renderListingsData(filtered);
  document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─────────────────────────────────────────────────────────
// 3. LISTINGS
// ─────────────────────────────────────────────────────────
function renderListings() {
  const data = showAll ? allLands : allLands.slice(0, 6);
  renderListingsData(data);
  const moreBtn = id('btn-more');
  if (moreBtn) moreBtn.textContent = Lang.t(showAll ? 'fl_less' : 'fl_more');
}

function renderListingsData(list) {
  const grid = id('listings-grid');
  if (!grid) return;

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <span style="font-size:2.5rem;opacity:.15;display:block;margin-bottom:1rem">◻</span>
        <div style="font-family:'Playfair Display',serif;font-size:1.3rem;margin-bottom:.4rem">${Lang.t('empty_title')}</div>
        <p style="font-size:.82rem;color:var(--mid)">${Lang.t('empty_sub')}</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map((l, i) => cardHTML(l, i)).join('');
  id('listings-count').textContent = Lang.t('n_plots', list.length);
}

function cardHTML(l, i) {
  const title = Lang.field(l, 'title');
  const loc   = Lang.field(l, 'location');
  const desc  = Lang.field(l, 'description');
  const img   = l.images?.[0] || '';
  const typeKey = 't_' + l.type;

  return `
  <div class="land-card" style="animation:cardIn .45s ${i * .06}s ease both"
       onclick="openDetail('${l._id}')">
    <div class="card-img">
      ${img
        ? `<img src="${esc(img)}" alt="${esc(title)}" loading="lazy">`
        : `<div class="card-no-img">◻ No Image</div>`}
      ${l.featured ? `<span class="card-badge featured">${Lang.t('badge_featured')}</span>` : ''}
    </div>
    <div class="card-body">
      <div class="card-type-tag">${Lang.t(typeKey)}</div>
      <div class="card-title">${esc(title)}</div>
      <div class="card-location"><img src="/icon/loction.svg" alt="location" style="width: 16px; height: 16px; margin-right: 4px; vertical-align: middle;"> ${esc(loc)}</div>
      <div class="card-specs">
        <span class="card-spec">⬡ ${esc(l.area)}</span>
        ${l.deed ? `<span class="card-spec">${esc(l.deed)}</span>` : ''}
      </div>
      ${desc ? `<div style="font-size:.78rem;color:var(--mid);line-height:1.65;margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${esc(desc)}</div>` : ''}
      <div class="card-footer">
        <div>
          <div class="price-label">${Lang.t('price_l')}</div>
          <div class="price-value">${formatPrice(l.price)}</div>
        </div>
        <button class="btn btn-ghost btn-sm"
                onclick="event.stopPropagation();openDetail('${l._id}')">
          ${Lang.t('card_view')}
        </button>
      </div>
    </div>
  </div>`;
}

function toggleMore() {
  showAll = !showAll;
  renderListings();
}

// ─────────────────────────────────────────────────────────
// 4. CATEGORIES
// ─────────────────────────────────────────────────────────
const CAT_DATA = [
  { key: 'empty',  img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=70', count: 32, type: 'empty' },
  { key: 'agri',   img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=70', count: 45, type: 'agricultural' },
  { key: 'road',   img: 'https://images.unsplash.com/photo-1558618047-f4e60cfd3f4e?w=500&q=70', count: 28, type: 'roadside' },
  { key: 'inv',    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=70', count: 19, type: 'investment' }
];

function renderCategories() {
  const grid = id('cat-grid');
  if (!grid) return;
  grid.innerHTML = CAT_DATA.map(c => `
    <div class="cat-card" onclick="filterByCategory('${c.type}')">
      <img src="${c.img}" alt="${Lang.t('cat_' + c.key)}" loading="lazy">
      <div class="cat-overlay"></div>
      <div class="cat-content">
        <div class="cat-name">${Lang.t('cat_' + c.key)}</div>
        <div class="cat-count">${c.count} ${Lang.t('cat_plots')}</div>
      </div>
      <div class="cat-arrow">↗</div>
    </div>`).join('');
}

function filterByCategory(type) {
  showAll = true;
  const filtered = allLands.filter(l => l.type === type);
  renderListingsData(filtered);
  document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────────
// 5. WHY CHOOSE US
// ─────────────────────────────────────────────────────────
const WHY_ICONS = ['✓', '◎', '◈', '⬡', '◻', '△'];

function renderWhyUs() {
  const grid = id('why-grid');
  if (!grid) return;
  grid.innerHTML = [1,2,3,4,5,6].map((n, i) => `
    <div class="why-card">
      <div class="why-icon">${WHY_ICONS[i]}</div>
      <div class="why-title">${Lang.t('why' + n + '_t')}</div>
      <p class="why-desc">${Lang.t('why' + n + '_d')}</p>
    </div>`).join('');
}

// ─────────────────────────────────────────────────────────
// 6. HOW IT WORKS
// ─────────────────────────────────────────────────────────
function renderHowItWorks() {
  const steps = id('hiw-steps');
  if (!steps) return;
  steps.innerHTML = [1,2,3,4].map(n => `
    <div class="step">
      <div class="step-num">0${n}</div>
      <div class="step-title">${Lang.t('step' + n + '_t')}</div>
      <p class="step-desc">${Lang.t('step' + n + '_d')}</p>
    </div>`).join('');
}

// ─────────────────────────────────────────────────────────
// 7. CONTACT form submit
// ─────────────────────────────────────────────────────────
function submitContact() {
  const name  = id('cf-name')?.value.trim();
  const email = id('cf-email')?.value.trim();
  const msg   = id('cf-msg')?.value.trim();

  if (!name || !email || !msg) {
    showToast(Lang.t('contact_err'), true);
    return;
  }

  ['cf-name','cf-email','cf-phone','cf-msg'].forEach(k => {
    const el = id(k);
    if (el) el.value = '';
  });

  showToast(Lang.t('contact_sent'));
}

// ─────────────────────────────────────────────────────────
// 9. MAP
// ─────────────────────────────────────────────────────────
const MAP_LOCS = [
  { nameKey: 'HQ',  meta: 'Vientiane', type: 'office', active: true },
  { nameKey: 'L1',  meta: 'Savannakhet', type: 'land' },
  { nameKey: 'L2',  meta: 'Luang Prabang', type: 'land' },
  { nameKey: 'L3',  meta: 'Vientiane', type: 'land' },
  { nameKey: 'L4',  meta: 'Bokeo', type: 'land' }
];

function renderMap() {
  const list = id('map-loc-list');
  if (!list) return;
  list.innerHTML = MAP_LOCS.map(loc => `
    <div class="map-loc-item ${loc.active ? 'active' : ''}" onclick="showToast('${esc(loc.meta)}')">
      <div class="map-loc-name">${loc.type === 'office' ? `TERRA ${Lang.t('leg_office')}` : `${Lang.t('leg_land')} #${loc.nameKey}`}</div>
      <div class="map-loc-meta">${esc(loc.meta)}</div>
    </div>`).join('');

  // map tooltips
  ['hq','l1','l2','l3','l4'].forEach((k, i) => {
    const el = id(`mtt-${k}`);
    if (!el) return;
    const loc = MAP_LOCS[i];
    el.textContent = loc.type === 'office'
      ? `TERRA ${Lang.t('leg_office')}`
      : `${Lang.t('leg_land')} #${loc.nameKey} — ${loc.meta}`;
  });
}

// ─────────────────────────────────────────────────────────
// DETAIL MODAL
// ─────────────────────────────────────────────────────────
async function openDetail(landId) {
  openModal('detail-modal');
  id('dm-body').innerHTML = `<div style="text-align:center;padding:3rem;font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.2em;color:var(--mid)">${Lang.t('loading')}</div>`;
  id('dm-title').textContent = '…';

  try {
    const l = await API.getLand(landId);
    const title = Lang.field(l, 'title');
    const loc   = Lang.field(l, 'location');
    const desc  = Lang.field(l, 'description');
    const img   = l.images?.[0] || '';

    id('dm-title').textContent = title;
    id('dm-body').innerHTML = `
      ${img ? `<div style="height:220px;overflow:hidden;margin-bottom:1.5rem;background:var(--s2)"><img src="${esc(img)}" style="width:100%;height:100%;object-fit:cover" alt=""></div>` : ''}
      <div style="font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:700;margin-bottom:1.25rem;padding-bottom:1.25rem;border-bottom:1px solid var(--bd)">${formatPrice(l.price)}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-bottom:1.5rem">
        ${[
          [Lang.t('d_loc'), loc],
          [Lang.t('d_area'), l.area],
          [Lang.t('d_type'), Lang.t('t_' + l.type)],
          [Lang.t('d_deed'), l.deed || '—']
        ].map(([label, val]) => `
          <div style="border:1px solid var(--bd);padding:.85rem 1rem;background:var(--s2)">
            <div style="font-family:'DM Mono',monospace;font-size:.52rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);margin-bottom:.3rem">${label}</div>
            <div style="font-size:.9rem;font-weight:600">${esc(val)}</div>
          </div>`).join('')}
      </div>
      ${desc ? `<p style="font-size:.84rem;color:var(--mid);line-height:1.8;margin-bottom:1.5rem">${esc(desc)}</p>` : ''}
      ${l.contact || l.phone ? `
        <div style="border:1px solid var(--bd);padding:1.1rem;background:var(--s2);margin-bottom:1.25rem">
          <div style="font-family:'DM Mono',monospace;font-size:.52rem;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);margin-bottom:.5rem">${Lang.t('d_con')}</div>
          ${l.contact ? `<div style="font-weight:600;margin-bottom:.2rem">${esc(l.contact)}</div>` : ''}
          ${l.phone   ? `<div style="font-family:'DM Mono',monospace;font-size:.75rem;color:var(--mid);margin-bottom:1rem">${esc(l.phone)}</div>` : ''}
          <div style="display:flex;gap:.75rem;flex-wrap:wrap">
            ${l.phone ? `<a href="tel:${esc(l.phone)}" class="btn btn-primary btn-sm">${Lang.t('d_call')}</a>` : ''}
            <button class="btn btn-ghost btn-sm" onclick="closeModal('detail-modal');document.getElementById('contact-section').scrollIntoView({behavior:'smooth'})">${Lang.t('d_enq')}</button>
          </div>
        </div>` : ''}
    `;
  } catch (e) {
    id('dm-body').innerHTML = `<p style="color:#c0392b;font-size:.85rem">${e.message}</p>`;
  }
}

// ── Utility ──
function id(k) { return document.getElementById(k); }

// Animation keyframes
const style = document.createElement('style');
style.textContent = `@keyframes cardIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`;
document.head.appendChild(style);
