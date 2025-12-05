const express = require('express');
const router = express.Router();
const FooterController = require('../controllers/footer.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

/**
 * @route   GET /api/footer
 * @desc    Get footer data
 * @access  Public
 */
router.get('/', FooterController.getFooter);

/**
 * @route   PUT /api/footer
 * @desc    Update footer data
 * @access  Private (Admin only)
 */
router.put('/', authMiddleware, FooterController.updateFooter);

module.exports = router;
