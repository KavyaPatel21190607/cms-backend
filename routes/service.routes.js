const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/', serviceController.getServices);
router.put('/', authMiddleware, serviceController.updateServices);
router.post('/', authMiddleware, serviceController.addService);
router.delete('/:serviceId', authMiddleware, serviceController.deleteService);

module.exports = router;
