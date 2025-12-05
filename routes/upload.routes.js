const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');

router.post('/single', uploadController.uploadSingle);
router.post('/multiple', uploadController.uploadMultiple);
router.delete('/', uploadController.deleteFile);
router.get('/url', uploadController.getPublicUrl);

module.exports = router;
