import express from 'express';

const router = express.Router();

const profilingStatus = {};
const profiledQueries = [];

router.get('/profiling-status/:connectionId', (req, res) => {
  res.json({ connectionId: req.params.connectionId, enabled: profilingStatus[req.params.connectionId] || false });
});

router.get('/profiled-queries/:connectionId', (_req, res) => {
  res.json({ items: profiledQueries });
});

router.post('/start-profiling/:connectionId', (req, res) => {
  profilingStatus[req.params.connectionId] = true;
  res.json({ ok: true, connectionId: req.params.connectionId });
});

router.post('/stop-profiling/:connectionId', (req, res) => {
  profilingStatus[req.params.connectionId] = false;
  res.json({ ok: true, connectionId: req.params.connectionId });
});

router.post('/suggest-indexes', (_req, res) => {
  res.json({ items: [{ name: 'idx_status', reason: 'Common filter' }] });
});

router.post('/create-index', (_req, res) => {
  res.json({ ok: true });
});

router.get('/query-logs/suggest-indexes/:queryId', (_req, res) => {
  res.json({ items: [{ name: 'idx_query', reason: 'Suggested for this query' }] });
});

router.post('/query-logs/create-index', (_req, res) => {
  res.json({ ok: true });
});

export default router;
