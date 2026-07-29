import express from 'express';

const router = express.Router();

router.post('/generate', (req, res) => {
  const { prompt } = req.body || {};
  res.json({
    generatedQuery: `// Generated from: ${prompt || 'your request'}\n db.collection.find({})`
  });
});

export default router;
