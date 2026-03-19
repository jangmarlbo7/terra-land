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
    enum: ['available','reserved','sold'],
    default: 'available'
  }
}, { timestamps: true });

module.exports = mongoose.model('Land', landSchema);
