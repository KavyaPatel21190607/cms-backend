const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/', aboutController.getAbout);
router.put('/', authMiddleware, aboutController.updateAbout);

module.exports = router;
