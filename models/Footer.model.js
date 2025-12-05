const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  brand: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  socialLinks: [{
    platform: String,
    icon: String,
    href: String
  }],
  quickLinks: [{
    name: String,
    href: String
  }],
  bottomBar: {
    text: String,
    heartIcon: Boolean,
    links: [{
      name: String,
      href: String
    }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Footer', footerSchema, 'Footer');
