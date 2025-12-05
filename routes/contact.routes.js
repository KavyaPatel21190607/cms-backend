const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/', contactController.getContact);
router.put('/', authMiddleware, contactController.updateContact);
router.post('/submit', contactController.submitContactForm);

// Contact Messages Routes (for CMS)
router.get('/messages', authMiddleware, contactController.getContactMessages);
router.put('/messages/:id/read', authMiddleware, contactController.markMessageAsRead);
router.put('/messages/:id/status', authMiddleware, contactController.updateMessageStatus);
router.delete('/messages/:id', authMiddleware, contactController.deleteContactMessage);

module.exports = router;
