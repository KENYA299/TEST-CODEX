import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export function loginAdmin(req, res) {
  const { secretKey } = req.body;

  if (secretKey !== env.adminSecretKey) {
    return res.status(401).json({ message: 'Invalid admin secret key' });
  }

  const token = jwt.sign(
    { role: 'admin' },
    env.jwtSecret,
    { expiresIn: '8h' }
  );

  return res.json({ token });
}

export function getSession(req, res) {
  return res.json({ authenticated: true, role: req.admin?.role || 'admin' });
}
