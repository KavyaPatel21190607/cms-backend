const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/', skillController.getSkills);
router.put('/', authMiddleware, skillController.updateSkills);
router.post('/', authMiddleware, skillController.addSkill);
router.delete('/:skillId', authMiddleware, skillController.deleteSkill);

module.exports = router;
