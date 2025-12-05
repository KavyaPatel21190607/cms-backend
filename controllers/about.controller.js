const About = require('../models/About.model');

// Get about data
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About data not found'
      });
    }

    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching about data',
      error: error.message
    });
  }
};

// Update about data
exports.updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    
    if (!about) {
      about = new About(req.body);
    } else {
      Object.assign(about, req.body);
    }

    await about.save();

    res.json({
      success: true,
      message: 'About data updated successfully',
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating about data',
      error: error.message
    });
  }
};
