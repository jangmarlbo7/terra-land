// public/js/contact.js

document.addEventListener('DOMContentLoaded', () => {
  Lang.applyAll();
  renderInterestSelect();

  document.addEventListener('langchange', () => {
    Lang.applyAll();
    renderInterestSelect();
  });

  document.getElementById('btn-send')?.addEventListener('click', submitContact);
});

function renderInterestSelect() {
  const sel = document.getElementById('cf-interest');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = `
    <option value="buy">${Lang.t('cfi_buy')}</option>
    <option value="sell">${Lang.t('cfi_sell')}</option>
    <option value="info">${Lang.t('cfi_info')}</option>
  `;
  sel.value = cur || 'buy';
}

function submitContact() {
  const name  = document.getElementById('cf-name')?.value.trim();
  const email = document.getElementById('cf-email')?.value.trim();
  const msg   = document.getElementById('cf-msg')?.value.trim();

  if (!name || !email || !msg) {
    showToast(Lang.t('contact_err'), true);
    return;
  }

  // In production: POST to /api/contact
  console.log('Contact submitted:', { name, email, msg });

  ['cf-name','cf-email','cf-phone','cf-msg'].forEach(k => {
    const el = document.getElementById(k);
    if (el) el.value = '';
  });

  showToast(Lang.t('contact_sent'));
}
