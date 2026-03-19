const mongoose = require('mongoose');

const ml = {
  en: { type: String, default: '' },
  lo: { type: String, default: '' },
  th: { type: String, default: '' }
};

const landSchema = new mongoose.Schema({
  title:       { type: ml, required: true },
  description: { type: ml },
  location:    { type: ml, required: true },
  price:       { type: Number, required: true },
  area:        { type: String, required: true },
  type: {
    type: String,
    enum: ['agricultural','residential','commercial','industrial',
           'forest','roadside','investment','empty','other'],
    required: true
  },
  deed:     { type: String, default: '' },
  contact:  { type: String, default: '' },
  phone:    { type: String, default: '' },
  images:   [{ type: String }],
  featured: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['available','reserved','sold','pending'],
    default: 'available'
  },
  // Map coordinates
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
  },
  // User submission tracking
  submittedBy: { type: String, default: '' }, // email or name
  submittedByPhone: { type: String, default: '' },
  submittedAt: { type: Date, default: null },
  approvedAt: { type: Date, default: null }
}, { timestamps: true });

// Index for geo queries
landSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Land', landSchema);
