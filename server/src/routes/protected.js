import express from 'express';
import authMiddleware from '../middleware/auth.js';
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
  return res.status(200).json({
    message: `Welcome to your dashboard, ${req.user.name}!`,
    user: req.user
  });
});

router.get('/admin', authMiddleware, authorizeRole('admin'), (req, res) => {
  return res.status(200).json({
    message: `Welcome admin ${req.user.name}!`,
    stats: {
      users: 'Example stats placeholder',
      mrr: '$0'
    }
  });
});

export default router;
