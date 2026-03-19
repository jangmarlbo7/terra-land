const express = require('express');
const router  = express.Router();
const Settings = require('../models/Settings');

// ── Admin guard ──
function adminOnly(req, res, next) {
  if (req.headers['x-admin-token'] === process.env.ADMIN_PASSWORD) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// GET /api/settings — get office location (public)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ officeLocation: {} });
    }
    res.json(settings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/settings — update office location (admin only)
router.put('/', adminOnly, async (req, res) => {
  try {
    const { officeLocation } = req.body;
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ officeLocation: {} });
    }
    
    if (officeLocation) {
      settings.officeLocation = { ...settings.officeLocation, ...officeLocation };
    }
    
    await settings.save();
    res.json(settings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
