import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const users = [{
  email: 'admin@example.com',
  passwordHash: bcrypt.hashSync('admin123', 10),
  role: 'admin'
}];

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Email, password, and a valid role are required' });
    }

    const user = users.find((entry) => entry.email === email);
    if (!user || user.role !== role) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '8h' });
    return res.json({ token, role: user.role });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Login failed' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (users.some((entry) => entry.email === email)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    users.push({ email, passwordHash, role: 'user' });

    const token = jwt.sign({ email, role: 'user' }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '8h' });
    return res.json({ token, role: 'user' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

export default router;
