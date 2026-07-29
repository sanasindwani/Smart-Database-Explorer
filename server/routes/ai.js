import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json([]);
});

router.put('/', (_req, res) => {
  res.json({ ok: true });
});

router.post('/test-connection', (_req, res) => {
  res.json({ ok: true });
});

router.get('/available-models', (_req, res) => {
  res.json([]);
});

export default router;
