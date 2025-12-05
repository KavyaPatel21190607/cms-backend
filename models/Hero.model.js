const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    default: 'hero'
  },
  greeting: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  ctaButtons: [{
    label: String,
    icon: String,
    type: String,
    link: String
  }],
  heroImage: {
    src: String,
    alt: String,
    size: {
      width: Number,
      height: Number
    },
    experienceLabel: String
  },
  background: {
    gradient: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hero', heroSchema, 'Hero');
