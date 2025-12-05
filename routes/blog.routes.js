const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/', blogController.getBlogs);
router.put('/', authMiddleware, blogController.updateBlogs);
router.post('/', authMiddleware, blogController.addBlog);
router.delete('/:blogId', authMiddleware, blogController.deleteBlog);

module.exports = router;
