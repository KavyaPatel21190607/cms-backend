const mongoose = require('mongoose');

const blogItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  readTime: {
    type: String
  },
  category: {
    type: String
  },
  link: {
    type: String
  }
});

const blogsSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,
    default: 'blogs'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  featuredBlog: blogItemSchema,
  blogs: [blogItemSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogsSchema, 'Blog');
