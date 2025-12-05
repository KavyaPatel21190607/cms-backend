const Testimonials = require('../models/Testimonial.model');

// Get testimonials data
exports.getTestimonials = async (req, res) => {
  try {
    let testimonials = await Testimonials.findOne();
    
    if (!testimonials) {
      // Create empty testimonials document if it doesn't exist
      testimonials = new Testimonials({
        sectionId: 'testimonials',
        title: 'Client Testimonials',
        subtitle: 'What clients say',
        testimonials: []
      });
      await testimonials.save();
    }

    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
};

// Update testimonials data
exports.updateTestimonials = async (req, res) => {
  try {
    let testimonials = await Testimonials.findOne();
    
    if (!testimonials) {
      testimonials = new Testimonials(req.body);
    } else {
      Object.assign(testimonials, req.body);
      testimonials.markModified('testimonials');
    }

    await testimonials.save();

    res.json({
      success: true,
      message: 'Testimonials updated successfully',
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating testimonials',
      error: error.message
    });
  }
};

// Add a single testimonial
exports.addTestimonial = async (req, res) => {
  try {
    let testimonials = await Testimonials.findOne();
    
    if (!testimonials) {
      testimonials = new Testimonials({
        sectionId: 'testimonials',
        title: 'Client Testimonials',
        subtitle: 'What clients say',
        testimonials: [req.body]
      });
    } else {
      testimonials.testimonials.push(req.body);
      testimonials.markModified('testimonials');
    }

    await testimonials.save();

    res.json({
      success: true,
      message: 'Testimonial added successfully',
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding testimonial',
      error: error.message
    });
  }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const { testimonialId } = req.params;
    const testimonials = await Testimonials.findOne();
    
    if (!testimonials) {
      return res.status(404).json({
        success: false,
        message: 'Testimonials not found'
      });
    }

    testimonials.testimonials = testimonials.testimonials.filter(
      t => t._id.toString() !== testimonialId
    );
    testimonials.markModified('testimonials');

    await testimonials.save();

    res.json({
      success: true,
      message: 'Testimonial deleted successfully',
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting testimonial',
      error: error.message
    });
  }
};
