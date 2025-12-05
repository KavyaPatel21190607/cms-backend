const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { authMiddleware, superAdminMiddleware } = require('../middleware/auth.middleware');

// Validation rules
const registerValidation = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// Public routes
router.post('/login', loginValidation, authController.login);

// Protected routes
router.get('/me', authMiddleware, authController.getMe);
router.get('/verify', authMiddleware, authController.verifyToken);
router.put('/password', authMiddleware, authController.updatePassword);
router.put('/profile', authMiddleware, authController.updateProfile);

// Superadmin only routes
router.post('/register', authMiddleware, superAdminMiddleware, registerValidation, authController.register);

module.exports = router;
