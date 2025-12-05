const Experience = require('../models/Experience.model');

// Get experience data
exports.getExperience = async (req, res) => {
  try {
    let experience = await Experience.findOne();
    
    if (!experience) {
      // Auto-create empty experience document
      experience = new Experience({
        sectionId: 'experience',
        title: 'Professional Experience',
        subtitle: 'My career journey and achievements',
        experiences: []
      });
      await experience.save();
    }

    res.json({
      success: true,
      data: experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching experience',
      error: error.message
    });
  }
};

// Update experience data
exports.updateExperience = async (req, res) => {
  try {
    let experience = await Experience.findOne();
    
    if (!experience) {
      experience = new Experience(req.body);
    } else {
      Object.assign(experience, req.body);
      // Mark nested arrays as modified for Mongoose to persist changes
      if (req.body.experiences) {
        experience.markModified('experiences');
      }
    }

    await experience.save();

    res.json({
      success: true,
      message: 'Experience updated successfully',
      data: experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating experience',
      error: error.message
    });
  }
};
