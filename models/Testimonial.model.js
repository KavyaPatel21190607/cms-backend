const mongoose = require('mongoose');

const testimonialItemSchema = new mongoose.Schema({
  name: {
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
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const testimonialsSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    default: 'testimonials'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  testimonials: [testimonialItemSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialsSchema, 'Testimonials');
