import express from 'express';

const router = express.Router();

router.get('/:connectionId', (req, res) => {
  const includedCollections = req.query.includedCollections || 'users';
  const formattedSchema = JSON.stringify({
    connectionId: req.params.connectionId,
    includedCollections,
    collections: [
      {
        name: 'users',
        fields: [{ name: '_id', type: 'ObjectId' }, { name: 'email', type: 'string' }]
      }
    ]
  }, null, 2);

  res.json({ formattedSchema });
});

export default router;
