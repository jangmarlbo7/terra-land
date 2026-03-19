const express = require('express');
const router  = express.Router();
const Land    = require('../models/Land');

// ── Admin guard ──
function adminOnly(req, res, next) {
  if (req.headers['x-admin-token'] === process.env.ADMIN_PASSWORD) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// GET /api/lands  — public catalog
router.get('/', async (req, res) => {
  try {
    const { type, status = 'available', featured, search, lang = 'en' } = req.query;
    const filter = {};
    if (status)   filter.status   = status;
    if (type)     filter.type     = type;
    if (featured) filter.featured = featured === 'true';
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [
        { [`title.${lang}`]:    re },
        { [`location.${lang}`]: re }
      ];
    }
    res.json(await Land.find(filter).sort({ featured: -1, createdAt: -1 }));
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /api/lands/:id  — public detail
router.get('/:id', async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) return res.status(404).json({ error: 'Not found' });
    res.json(land);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST — admin create
router.post('/', adminOnly, async (req, res) => {
  try { res.status(201).json(await Land.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

// PUT — admin update
router.put('/:id', adminOnly, async (req, res) => {
  try {
    const land = await Land.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!land) return res.status(404).json({ error: 'Not found' });
    res.json(land);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// DELETE — admin
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    if (!await Land.findByIdAndDelete(req.params.id))
      return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
