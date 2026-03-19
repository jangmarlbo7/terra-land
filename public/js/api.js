// public/js/api.js — fetch wrapper for public pages

const API = (() => {
  const BASE = '/api';

  async function req(path, opts = {}) {
    const res = await fetch(BASE + path, {
      headers: { 'Content-Type': 'application/json', ...opts.headers },
      ...opts
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || 'Request failed');
    }
    return res.json();
  }

  return {
    getLands: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return req(`/lands${qs ? '?' + qs : ''}`);
    },
    getLand: (id) => req(`/lands/${id}`)
  };
})();
