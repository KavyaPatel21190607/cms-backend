const express = require('express');
const router = express.Router();
const heroController = require('../controllers/hero.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/', heroController.getHero);
router.put('/', authMiddleware, heroController.updateHero);

module.exports = router;
