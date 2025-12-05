const Blogs = require('../models/Blog.model');

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.findOne();
    
    if (!blogs) {
      return res.status(404).json({
        success: false,
        message: 'Blogs data not found'
      });
    }

    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

// Update blogs
exports.updateBlogs = async (req, res) => {
  try {
    let blogs = await Blogs.findOne();
    
    if (!blogs) {
      blogs = new Blogs(req.body);
    } else {
      Object.assign(blogs, req.body);
      blogs.markModified('blogs');
    }

    await blogs.save();

    res.json({
      success: true,
      message: 'Blogs updated successfully',
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blogs',
      error: error.message
    });
  }
};

// Add a single blog
exports.addBlog = async (req, res) => {
  try {
    let blogs = await Blogs.findOne();
    
    if (!blogs) {
      blogs = new Blogs({
        sectionId: 'blogs',
        title: 'Latest Blog Posts',
        subtitle: 'Insights and tutorials',
        blogs: [req.body]
      });
    } else {
      blogs.blogs.push(req.body);
      blogs.markModified('blogs');
    }

    await blogs.save();

    res.json({
      success: true,
      message: 'Blog added successfully',
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding blog',
      error: error.message
    });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blogs = await Blogs.findOne();
    
    if (!blogs) {
      return res.status(404).json({
        success: false,
        message: 'Blogs not found'
      });
    }

    blogs.blogs = blogs.blogs.filter(
      b => b._id.toString() !== blogId
    );
    blogs.markModified('blogs');

    await blogs.save();

    res.json({
      success: true,
      message: 'Blog deleted successfully',
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
};
