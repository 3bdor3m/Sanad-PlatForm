import express from 'express';
import { check } from 'express-validator';
import { signup, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/signup',
  [
    check('fullName', 'Full name is required').not().isEmpty().trim().escape(),
    check('gender', 'Gender must be male, female, or other').isIn(['male', 'female', 'other']),
    check('phoneNumber', 'Phone number is required').not().isEmpty().trim(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password must be at least 8 characters and contain one uppercase, one lowercase and one number')
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
  ],
  signup
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

router.get('/me', protect, getMe);

export default router;
