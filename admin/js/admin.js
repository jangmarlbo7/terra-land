// admin/js/admin.js

const API_BASE = '/api';
let adminToken = sessionStorage.getItem('terra_admin') || '';
let lands      = [];
let editingId  = null;
let deleteId   = null;
let uploadedImages = []; // Track uploaded images during form editing

// ── Auth ──
async function doLogin() {
  const pw = gv('login-pw');
  if (!pw) return;

  // Verify by probing a protected route
  try {
    const res = await fetch(`${API_BASE}/lands/000000000000000000000000`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': pw },
      body: JSON.stringify({})
    });
    if (res.status === 401) { tx('login-err', 'Wrong password.'); return; }
    adminToken = pw;
    sessionStorage.setItem('terra_admin', pw);
    showAdmin();
  } catch (e) { tx('login-err', 'Cannot connect to server: ' + e.message); }
}

function doLogout() {
  adminToken = '';
  sessionStorage.removeItem('terra_admin');
  document.getElementById('admin-layout').classList.remove('visible');
  document.getElementById('login-screen').style.display = 'flex';
  sv('login-pw', '');
}

function showAdmin() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-layout').classList.add('visible');
  loadLands();
  switchPanel('dashboard');
}

// ── API ──
async function apiReq(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: { 'x-admin-token': adminToken }
  };
  // Only add Content-Type for non-FormData bodies
  if (!(body instanceof FormData)) {
    opts.headers['Content-Type'] = 'application/json';
  }
  if (body) {
    opts.body = body instanceof FormData ? body : JSON.stringify(body);
  }
  const res = await fetch(API_BASE + path, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// Upload a single image file
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const result = await apiReq('/upload', 'POST', formData);
    return result.url;
  } catch (e) {
    throw new Error(`Failed to upload ${file.name}: ${e.message}`);
  }
}

// ── Load all lands (all statuses for admin) ──
async function loadLands() {
  try {
    const [avail, sold, res] = await Promise.all([
      apiReq('/lands?status=available'),
      apiReq('/lands?status=sold'),
      apiReq('/lands?status=reserved')
    ]);
    lands = [...avail, ...sold, ...res];
    renderDashboard();
    renderTable();
  } catch (e) {
    toast('Error loading listings: ' + e.message, true);
  }
}

// ── Dashboard ──
function renderDashboard() {
  const total = lands.length;
  const avail = lands.filter(l => l.status === 'available').length;
  const sold  = lands.filter(l => l.status === 'sold').length;
  const val   = lands.reduce((s, l) => s + (l.price || 0), 0);

  tx('stat-total', total);
  tx('stat-avail', avail);
  tx('stat-sold',  sold);
  tx('stat-val',   '฿' + (val / 1e6).toFixed(1) + 'M');

  const tbody = document.getElementById('recent-tbody');
  if (!tbody) return;
  tbody.innerHTML = lands.slice(0, 6).map(l => `
    <tr>
      <td class="td-title">
        ${esc(l.title?.en || l.title?.lo || '—')}
        <small>${esc(l.location?.en || l.location?.lo || '')}</small>
      </td>
      <td><span class="badge badge-${l.status}">${l.status}</span>
          ${l.featured ? '<span class="badge badge-featured" style="margin-left:4px">★ featured</span>' : ''}
      </td>
      <td class="td-price">฿${Number(l.price).toLocaleString()}</td>
      <td>${esc(l.type || '—')}</td>
    </tr>`).join('') ||
    '<tr><td colspan="4" style="color:var(--mid);text-align:center;padding:2rem">No listings yet</td></tr>';
}

// ── Listings Table ──
function renderTable() {
  const q   = (gv('a-search')).toLowerCase();
  const tp  = gv('a-type');
  const st  = gv('a-status');

  const filtered = lands.filter(l => {
    const ti  = (l.title?.en || l.title?.lo || '').toLowerCase();
    const loc = (l.location?.en || l.location?.lo || '').toLowerCase();
    return (!q || ti.includes(q) || loc.includes(q))
        && (!tp || l.type === tp)
        && (!st || l.status === st);
  });

  document.getElementById('table-count').textContent =
    `${filtered.length} listing${filtered.length !== 1 ? 's' : ''}`;

  document.getElementById('listings-tbody').innerHTML = filtered.map(l => `
    <tr>
      <td class="td-title">
        ${esc(l.title?.en || l.title?.lo || '—')}
        <small>${esc(l.location?.en || l.location?.lo || '')}</small>
      </td>
      <td>${esc(l.type || '—')}</td>
      <td class="td-price">฿${Number(l.price).toLocaleString()}</td>
      <td>${esc(l.area || '—')}</td>
      <td>
        <span class="badge badge-${l.status}">${l.status}</span>
        ${l.featured ? '<span class="badge badge-featured" style="margin-left:4px">★</span>' : ''}
      </td>
      <td class="td-actions">
        <button class="btn sm" onclick="openEdit('${l._id}')">Edit</button>
        <button class="btn sm danger" onclick="askDelete('${l._id}', '${esc(l.title?.en || l.title?.lo || '')}')">Delete</button>
      </td>
    </tr>`).join('') ||
    '<tr><td colspan="6" style="color:var(--mid);text-align:center;padding:3rem">No listings found</td></tr>';
}

// ── Panel switching ──
function switchPanel(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sb-nav a').forEach(a => a.classList.remove('active'));
  document.getElementById('panel-' + name)?.classList.add('active');
  document.getElementById('sbn-' + name)?.classList.add('active');
  const titles = { dashboard: 'Dashboard', listings: 'All Listings', add: 'Add Listing' };
  tx('main-header-title', titles[name] || name);
  if (name === 'listings') renderTable();
}

// ── Add modal ──
function openAdd() {
  editingId = null;
  tx('form-modal-title', 'Add New Listing');
  resetForm();
  openModal('form-modal');
}

// ── Edit modal ──
async function openEdit(id) {
  editingId = id;
  tx('form-modal-title', 'Edit Listing');
  resetForm();
  openModal('form-modal');

  try {
    const l = await apiReq(`/lands/${id}`);
    fillForm(l);
  } catch (e) {
    toast('Failed to load: ' + e.message, true);
    closeModal('form-modal');
  }
}

function fillForm(l) {
  ['en','lo','th'].forEach(lg => {
    sv(`f-title-${lg}`,    l.title?.[lg]       || '');
    sv(`f-loc-${lg}`,      l.location?.[lg]    || '');
    sv(`f-desc-${lg}`,     l.description?.[lg] || '');
  });
  sv('f-price',   l.price   || '');
  sv('f-area',    l.area    || '');
  sv('f-type',    l.type    || '');
  sv('f-deed',    l.deed    || '');
  sv('f-contact', l.contact || '');
  sv('f-phone',   l.phone   || '');
  sv('f-status',  l.status  || 'available');
  sv('f-featured', l.featured ? 'true' : 'false');
  
  // Handle image URLs
  uploadedImages = [];
  sv('f-image-urls', '');
  displayUploadedImages();
  
  // If editing, show existing images
  if (l.images && l.images.length > 0) {
    // Separate uploaded images (start with /uploads/) from URL images
    l.images.forEach(img => {
      if (img.startsWith('/uploads/')) {
        uploadedImages.push(img);
      }
    });
    displayUploadedImages();
  }
}

function resetForm() {
  document.getElementById('land-form')?.reset();
  tx('form-err', '');
  uploadedImages = [];
  displayUploadedImages();
  switchLangTab('en');
}

// ── Save ──
async function saveListing() {
  const saveBtn = document.getElementById('save-btn');
  saveBtn.disabled = true;
  tx('form-err', '');

  try {
    // Handle file uploads first
    const fileInput = document.getElementById('f-image-files');
    if (fileInput && fileInput.files.length > 0) {
      document.getElementById('upload-progress').style.display = 'block';
      const progressBar = document.getElementById('upload-progress-bar');
      
      const files = Array.from(fileInput.files);
      for (let i = 0; i < files.length; i++) {
        try {
          const url = await uploadImage(files[i]);
          uploadedImages.push(url);
          progressBar.style.width = `${((i + 1) / files.length) * 100}%`;
        } catch (e) {
          throw new Error(`Failed to upload image: ${e.message}`);
        }
      }
      document.getElementById('upload-progress').style.display = 'none';
      fileInput.value = ''; // Clear the file input
    }
    
    const body = buildFormBody();
    if (editingId) {
      await apiReq(`/lands/${editingId}`, 'PUT', body);
      toast('Listing updated ✓');
    } else {
      await apiReq('/lands', 'POST', body);
      toast('Listing created ✓');
    }
    closeModal('form-modal');
    await loadLands();
  } catch (e) {
    tx('form-err', e.message);
  } finally {
    saveBtn.disabled = false;
  }
}

function buildFormBody() {
  const g = id => (document.getElementById(id)?.value?.trim() || '');
  const price = parseFloat(g('f-price'));

  if (!g('f-title-en') && !g('f-title-lo')) throw new Error('Title (EN or LO) is required');
  if (!g('f-loc-en')   && !g('f-loc-lo'))   throw new Error('Location (EN or LO) is required');
  if (!g('f-type'))                          throw new Error('Land type is required');
  if (!g('f-area'))                          throw new Error('Area is required');
  if (isNaN(price) || price <= 0)            throw new Error('Price must be a positive number');

  // Combine uploaded images with URL images
  const images = [...uploadedImages];
  const urlsRaw = g('f-image-urls');
  if (urlsRaw) {
    const urlImages = urlsRaw.split('\n').map(s => s.trim()).filter(Boolean);
    images.push(...urlImages);
  }

  return {
    title:       { en: g('f-title-en'), lo: g('f-title-lo'), th: g('f-title-th') },
    location:    { en: g('f-loc-en'),   lo: g('f-loc-lo'),   th: g('f-loc-th')   },
    description: { en: g('f-desc-en'),  lo: g('f-desc-lo'),  th: g('f-desc-th')  },
    price,
    area:     g('f-area'),
    type:     g('f-type'),
    deed:     g('f-deed'),
    contact:  g('f-contact'),
    phone:    g('f-phone'),
    status:   g('f-status'),
    featured: g('f-featured') === 'true',
    images
  };
}

// ── Delete ──
function askDelete(id, title) {
  deleteId = id;
  tx('delete-name', title || 'this listing');
  openModal('delete-modal');
}

async function doDelete() {
  if (!deleteId) return;
  const btn = document.getElementById('confirm-delete-btn');
  btn.disabled = true;
  try {
    await apiReq(`/lands/${deleteId}`, 'DELETE');
    closeModal('delete-modal');
    toast('Listing deleted');
    await loadLands();
  } catch (e) {
    toast('Delete failed: ' + e.message, true);
  } finally {
    btn.disabled = false;
    deleteId = null;
  }
}

// ── Lang tabs ──
function switchLangTab(lang) {
  document.querySelectorAll('.ltab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.lp').forEach(p => p.classList.remove('active'));
  document.querySelector(`.ltab[data-lang="${lang}"]`)?.classList.add('active');
  document.querySelector(`.lp[data-lang="${lang}"]`)?.classList.add('active');
}

// ── Modal helpers ──
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Toast ──
function toast(msg, isErr = false) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.style.background = isErr ? 'var(--danger)' : 'var(--ink)';
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3500);
}

// ── Helpers ──
function gv(id) { return (document.getElementById(id) || {}).value || ''; }
function sv(id, v) { const e = document.getElementById(id); if (e) e.value = v; }
function tx(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ── Image handling ──
function displayUploadedImages() {
  const container = document.getElementById('uploaded-images');
  if (!container) return;
  
  if (uploadedImages.length === 0) {
    container.innerHTML = '';
    return;
  }
  
  container.innerHTML = `
    <div style="font-size:0.75rem;color:var(--mid);margin-bottom:0.5rem">Uploaded Images (${uploadedImages.length}):</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px">
      ${uploadedImages.map((img, idx) => `
        <div style="position:relative;border-radius:4px;overflow:hidden;background:var(--bg);border:1px solid var(--bd)">
          <img src="${img}" alt="uploaded" style="width:100%;height:80px;object-fit:cover;display:block">
          <button type="button" onclick="removeUploadedImage(${idx})" style="position:absolute;top:2px;right:2px;background:var(--danger);color:white;border:none;border-radius:2px;padding:2px;width:20px;height:20px;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;line-height:1">×</button>
        </div>
      `).join('')}
    </div>
  `;
}

function removeUploadedImage(idx) {
  uploadedImages.splice(idx, 1);
  displayUploadedImages();
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-pw')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) closeModal(o.id); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape')
      document.querySelectorAll('.modal-overlay.open').forEach(o => closeModal(o.id));
  });
  document.getElementById('a-search')?.addEventListener('input', renderTable);
  document.getElementById('a-type')?.addEventListener('change', renderTable);
  document.getElementById('a-status')?.addEventListener('change', renderTable);
  
  // File input event
  document.getElementById('f-image-files')?.addEventListener('change', () => {
    const fileInput = document.getElementById('f-image-files');
    if (fileInput.files.length > 0) {
      const fileNames = Array.from(fileInput.files).map(f => f.name).join(', ');
      const preview = document.createElement('div');
      preview.style.fontSize = '0.75rem';
      preview.style.color = 'var(--mid)';
      preview.style.marginTop = '0.5rem';
      preview.textContent = `Selected: ${fileNames}`;
    }
  });

  if (adminToken) showAdmin();
});
