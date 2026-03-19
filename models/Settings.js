const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  officeLocation: {
    name: { type: String, default: 'TERRA Headquarters' },
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [102.6331, 17.9757] } // [longitude, latitude] - Vientiane default
    },
    phone: { type: String, default: '+856 20 52877075' },
    email: { type: String, default: 'info@terra-land.com' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
