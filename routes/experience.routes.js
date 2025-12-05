const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experience.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/', experienceController.getExperience);
router.put('/', authMiddleware, experienceController.updateExperience);

module.exports = router;
