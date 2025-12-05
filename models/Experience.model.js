const mongoose = require('mongoose');

const experienceItemSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  responsibilities: [{
    type: String
  }]
});

const experienceSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    default: 'experience'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  experiences: [experienceItemSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema, 'Experience');
