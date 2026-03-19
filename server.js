require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');
const multer   = require('multer');
const fs       = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (allowed.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpg, png, gif, webp)'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/uploads', express.static(uploadsDir));

// ── Admin guard ──
function adminOnly(req, res, next) {
  if (req.headers['x-admin-token'] === process.env.ADMIN_PASSWORD) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// Upload image endpoint
app.post('/api/upload', adminOnly, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl, filename: req.file.filename });
});

// API
app.use('/api/lands', require('./routes/lands'));
app.use('/api/settings', require('./routes/settings'));

// Page routes
app.get('/contact', (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('/admin', (_req, res) =>
  res.sendFile(path.join(__dirname, 'admin', 'index.html')));

// MongoDB → start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅  MongoDB connected');
    app.listen(PORT, () => console.log(`🚀  Server → http://localhost:${PORT}`));
  })
  .catch(err => { console.error('❌  MongoDB error:', err.message); process.exit(1); });
