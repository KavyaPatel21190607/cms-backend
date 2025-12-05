const Projects = require('../models/Project.model');

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Projects.findOne();
    
    if (!projects) {
      return res.status(404).json({
        success: false,
        message: 'Projects data not found'
      });
    }

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// Update projects
exports.updateProjects = async (req, res) => {
  try {
    let projects = await Projects.findOne();
    
    if (!projects) {
      projects = new Projects(req.body);
    } else {
      // Properly update nested arrays
      if (req.body.title) projects.title = req.body.title;
      if (req.body.subtitle) projects.subtitle = req.body.subtitle;
      if (req.body.projects) projects.projects = req.body.projects;
      if (req.body.sectionId) projects.sectionId = req.body.sectionId;
      
      // Mark the projects array as modified to ensure Mongoose saves it
      projects.markModified('projects');
    }

    await projects.save();

    res.json({
      success: true,
      message: 'Projects updated successfully',
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating projects',
      error: error.message
    });
  }
};

// Add a single project
exports.addProject = async (req, res) => {
  try {
    let projects = await Projects.findOne();
    
    if (!projects) {
      projects = new Projects({
        sectionId: 'projects',
        title: 'Featured Projects',
        subtitle: 'A selection of my recent work',
        projects: [req.body]
      });
    } else {
      projects.projects.push(req.body);
      // Mark as modified to ensure Mongoose saves the change
      projects.markModified('projects');
    }

    await projects.save();

    res.json({
      success: true,
      message: 'Project added successfully',
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding project',
      error: error.message
    });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const projects = await Projects.findOne();
    
    if (!projects) {
      return res.status(404).json({
        success: false,
        message: 'Projects not found'
      });
    }

    projects.projects = projects.projects.filter(
      p => p._id.toString() !== projectId
    );
    
    // Mark as modified to ensure Mongoose saves the change
    projects.markModified('projects');

    await projects.save();

    res.json({
      success: true,
      message: 'Project deleted successfully',
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};
