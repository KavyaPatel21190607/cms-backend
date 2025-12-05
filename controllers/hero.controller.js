const Hero = require('../models/Hero.model');

// Get hero data
exports.getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    
    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero data not found'
      });
    }

    res.json({
      success: true,
      data: hero
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hero data',
      error: error.message
    });
  }
};

// Update hero data
exports.updateHero = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    
    if (!hero) {
      hero = new Hero(req.body);
    } else {
      Object.assign(hero, req.body);
    }

    await hero.save();

    res.json({
      success: true,
      message: 'Hero data updated successfully',
      data: hero
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating hero data',
      error: error.message
    });
  }
};
