const mongoose = require('mongoose');

const skillCategorySchema = new mongoose.Schema({
  icon: String,
  title: String,
  skills: [String]
});

const proficiencySkillSchema = new mongoose.Schema({
  name: String,
  level: Number
});

const skillsSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    default: 'skills'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  skillCategories: [skillCategorySchema],
  proficiencySkills: [proficiencySkillSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Skill', skillsSchema, 'Skills');
