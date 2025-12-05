const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  icon: String,
  title: String,
  value: String,
  link: String
});

const formFieldSchema = new mongoose.Schema({
  name: String,
  type: String,
  label: String,
  placeholder: String,
  required: Boolean
});

const socialLinkSchema = new mongoose.Schema({
  platform: String,
  icon: String,
  link: String
});

const contactSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    default: 'contact'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  contactInfo: [contactInfoSchema],
  form: {
    fields: [formFieldSchema],
    submitButton: {
      text: String,
      icon: String
    }
  },
  socialLinks: [socialLinkSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema, 'Contact');
