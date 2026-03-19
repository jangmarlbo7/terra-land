const express = require('express');
const router  = express.Router();
const Land    = require('../models/Land');

// ── Admin guard ──
function adminOnly(req, res, next) {
  if (req.headers['x-admin-token'] === process.env.ADMIN_PASSWORD) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// GET /api/lands  — public catalog (only approved, not pending)
router.get('/', async (req, res) => {
  try {
    const { type, status = 'available', featured, search, lang = 'en' } = req.query;
    const filter = { status: { $ne: 'pending' } }; // Exclude pending listings
    if (status && status !== 'all')   filter.status   = status;
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

// GET /api/lands/pending  — admin view pending submissions (BEFORE /:id route)
router.get('/pending', adminOnly, async (req, res) => {
  try {
    const pendingLands = await Land.find({ status: 'pending' }).sort({ submittedAt: -1 });
    res.json(pendingLands);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/lands/:id  — public detail
router.get('/:id', async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) return res.status(404).json({ error: 'Not found' });
    res.json(land);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// POST /api/lands/submit  — user submission (pending approval)
router.post('/submit', async (req, res) => {
  try {
    const { title, description, location, price, area, type, coordinates, submittedBy, submittedByPhone } = req.body;
    
    // Basic validation
    if (!title || !location || !price || !area || !type || !coordinates) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newLand = new Land({
      title,
      description,
      location,
      price,
      area,
      type,
      coordinates: {
        type: 'Point',
        coordinates: [coordinates.lng, coordinates.lat] // GeoJSON format: [lng, lat]
      },
      status: 'pending',
      submittedBy,
      submittedByPhone,
      submittedAt: new Date()
    });

    const savedLand = await newLand.save();
    res.status(201).json({ message: 'Submission received. Awaiting admin approval.', _id: savedLand._id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST — admin create
router.post('/', adminOnly, async (req, res) => {
  try { res.status(201).json(await Land.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

// PUT /api/lands/:id/approve  — admin approve submission (BEFORE PUT /:id route)
router.put('/:id/approve', adminOnly, async (req, res) => {
  try {
    const land = await Land.findByIdAndUpdate(
      req.params.id,
      { status: 'available', approvedAt: new Date() },
      { new: true }
    );
    if (!land) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Land listing approved', land });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
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

// DELETE /api/lands/:id/reject  — admin reject submission (BEFORE DELETE /:id route)
router.delete('/:id/reject', adminOnly, async (req, res) => {
  try {
    const land = await Land.findByIdAndDelete(req.params.id);
    if (!land) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Submission rejected and deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE — admin delete approved listing
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    if (!await Land.findByIdAndDelete(req.params.id))
      return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
