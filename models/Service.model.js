const mongoose = require('mongoose');

const serviceItemSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String
  }
});

const servicesSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    default: 'services'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  services: [serviceItemSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', servicesSchema, 'Service');
