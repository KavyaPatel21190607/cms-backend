const Skills = require('../models/Skill.model');

// Get skills data
exports.getSkills = async (req, res) => {
  try {
    let skills = await Skills.findOne();
    
    if (!skills) {
      // Create empty skills document if it doesn't exist
      skills = new Skills({
        sectionId: 'skills',
        title: 'Skills & Expertise',
        subtitle: 'My Technical Skills',
        proficiencySkills: [],
        skillCategories: []
      });
      await skills.save();
    }

    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skills',
      error: error.message
    });
  }
};

// Update skills data
exports.updateSkills = async (req, res) => {
  try {
    let skills = await Skills.findOne();
    
    if (!skills) {
      skills = new Skills(req.body);
    } else {
      Object.assign(skills, req.body);
      skills.markModified('proficiencySkills');
      skills.markModified('skillCategories');
    }

    await skills.save();

    res.json({
      success: true,
      message: 'Skills updated successfully',
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating skills',
      error: error.message
    });
  }
};

// Add a single skill
exports.addSkill = async (req, res) => {
  try {
    let skills = await Skills.findOne();
    
    if (!skills) {
      skills = new Skills({
        sectionId: 'skills',
        title: 'Skills & Expertise',
        subtitle: 'My technical skills',
        skillCategories: [],
        proficiencySkills: [req.body]
      });
    } else {
      skills.proficiencySkills.push(req.body);
      skills.markModified('proficiencySkills');
    }

    await skills.save();

    res.json({
      success: true,
      message: 'Skill added successfully',
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding skill',
      error: error.message
    });
  }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const skills = await Skills.findOne();
    
    if (!skills) {
      return res.status(404).json({
        success: false,
        message: 'Skills not found'
      });
    }

    skills.proficiencySkills = skills.proficiencySkills.filter(
      s => s._id.toString() !== skillId
    );
    skills.markModified('proficiencySkills');

    await skills.save();

    res.json({
      success: true,
      message: 'Skill deleted successfully',
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting skill',
      error: error.message
    });
  }
};
