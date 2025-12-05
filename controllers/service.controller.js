const Services = require('../models/Service.model');

// Get services data
exports.getServices = async (req, res) => {
  try {
    let services = await Services.findOne();
    
    if (!services) {
      // Create empty services document if it doesn't exist
      services = new Services({
        sectionId: 'services',
        title: 'Our Services',
        subtitle: 'What we offer',
        services: []
      });
      await services.save();
    }

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
};

// Update services data
exports.updateServices = async (req, res) => {
  try {
    let services = await Services.findOne();
    
    if (!services) {
      services = new Services(req.body);
    } else {
      Object.assign(services, req.body);
      services.markModified('services');
    }

    await services.save();

    res.json({
      success: true,
      message: 'Services updated successfully',
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating services',
      error: error.message
    });
  }
};

// Add a single service
exports.addService = async (req, res) => {
  try {
    let services = await Services.findOne();
    
    if (!services) {
      services = new Services({
        sectionId: 'services',
        title: 'My Services',
        subtitle: 'What I offer',
        services: [req.body]
      });
    } else {
      services.services.push(req.body);
      services.markModified('services');
    }

    await services.save();

    res.json({
      success: true,
      message: 'Service added successfully',
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding service',
      error: error.message
    });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const services = await Services.findOne();
    
    if (!services) {
      return res.status(404).json({
        success: false,
        message: 'Services not found'
      });
    }

    services.services = services.services.filter(
      s => s._id.toString() !== serviceId
    );
    services.markModified('services');

    await services.save();

    res.json({
      success: true,
      message: 'Service deleted successfully',
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    });
  }
};
