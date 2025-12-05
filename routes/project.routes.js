const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/', projectController.getProjects);
router.put('/', authMiddleware, projectController.updateProjects);
router.post('/', authMiddleware, projectController.addProject);
router.delete('/:projectId', authMiddleware, projectController.deleteProject);

module.exports = router;
