import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const users = [];

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = users.find((entry) => entry.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '8h' });
    return res.json({ token });
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
    users.push({ email, passwordHash });

    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '8h' });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

export default router;
