import express from 'express';

const router = express.Router();

const logs = [
  {
    id: '1',
    queryText: 'db.users.find({ status: "active" })',
    executedAt: new Date().toISOString(),
    executionTimeMs: 18,
    resultCount: 3
  }
];

router.get('/', (_req, res) => {
  res.json({ items: logs });
});

export default router;
