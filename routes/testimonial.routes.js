const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/', testimonialController.getTestimonials);
router.put('/', authMiddleware, testimonialController.updateTestimonials);
router.post('/', authMiddleware, testimonialController.addTestimonial);
router.delete('/:testimonialId', authMiddleware, testimonialController.deleteTestimonial);

module.exports = router;
