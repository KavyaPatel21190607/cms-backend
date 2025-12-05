const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    default: 'about'
  },
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  bio: [{
    type: String
  }],
  highlights: [{
    type: String
  }],
  stats: [{
    icon: String,
    iconImage: String, // URL to uploaded icon image
    label: String,
    value: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('About', aboutSchema, 'About');
