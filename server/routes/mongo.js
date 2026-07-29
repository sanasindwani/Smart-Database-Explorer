import express from 'express';
import { MongoClient } from 'mongodb';

const router = express.Router();

const connections = [];

const getMongoClient = async (connection) => {
  const client = new MongoClient(connection.connectionString);
  await client.connect();
  return client;
};

router.get('/', async (_req, res) => {
  res.json(connections);
});

router.post('/', async (req, res) => {
  const connection = { id: Date.now().toString(), ...req.body };
  connections.push(connection);
  res.status(201).json(connection);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const index = connections.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Connection not found' });
  }

  connections[index] = { ...connections[index], ...req.body, id };
  res.json(connections[index]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const index = connections.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Connection not found' });
  }

  connections.splice(index, 1);
  res.status(204).send();
});

router.post('/test', async (req, res) => {
  try {
    const client = await getMongoClient(req.body);
    await client.db(req.body.databaseName || 'admin').command({ ping: 1 });
    await client.close();
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/collections', async (req, res) => {
  const connection = connections.find((item) => item.id === req.params.id);
  if (!connection) {
    return res.status(404).json({ error: 'Connection not found' });
  }

  try {
    const client = await getMongoClient(connection);
    const db = client.db(connection.databaseName || 'admin');
    const collections = await db.listCollections().toArray();
    await client.close();
    res.json(collections.map((item) => item.name));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const connection = connections.find((item) => item.id === req.params.id);
  if (!connection) {
    return res.status(404).json({ error: 'Connection not found' });
  }
  res.json(connection);
});

export default router;
