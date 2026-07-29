import express from 'express';

const router = express.Router();
const queries = [];

router.get('/', (_req, res) => {
  res.json({ items: queries });
});

router.get('/favorites', (_req, res) => {
  res.json(queries.filter((query) => query.isFavourite));
});

router.post('/', (req, res) => {
  const query = { id: Date.now().toString(), ...req.body };
  queries.push(query);
  res.status(201).json(query);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = queries.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Query not found' });
  }

  queries[index] = { ...queries[index], ...req.body, id };
  res.json(queries[index]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = queries.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Query not found' });
  }

  queries.splice(index, 1);
  res.status(204).send();
});

router.post('/:id/execute', (req, res) => {
  const query = queries.find((item) => item.id === req.params.id);
  if (!query) {
    return res.status(404).json({ error: 'Query not found' });
  }

  return res.json({ ok: true, query: query.queryText, result: [] });
});

router.get('/:id/download-json', (req, res) => {
  const query = queries.find((item) => item.id === req.params.id);
  if (!query) {
    return res.status(404).json({ error: 'Query not found' });
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ ok: true, query: query.queryText, result: [] }, null, 2));
});

router.post('/:id/favourite', (req, res) => {
  const { id } = req.params;
  const index = queries.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Query not found' });
  }

  queries[index] = { ...queries[index], isFavourite: req.body.isFavourite };
  res.json(queries[index]);
});

export default router;
