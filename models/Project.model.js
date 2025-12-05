const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tech: [{
    type: String
  }],
  demoLink: {
    type: String
  },
  codeLink: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const projectsSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    default: 'projects'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  projects: [projectSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectsSchema, 'Project');
