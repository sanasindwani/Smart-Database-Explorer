import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import mongoRoutes from './routes/mongo.js';
import queryRoutes from './routes/query.js';
import aiRoutes from './routes/ai.js';
import openAIRoutes from './routes/openAI.js';
import queryLogRoutes from './routes/queryLog.js';
import queryProfilerRoutes from './routes/queryProfiler.js';
import schemaRoutes from './routes/schema.js';
import aiQueryGeneratorRoutes from './routes/aiQueryGenerator.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: [process.env.CLIENT_URL || 'http://localhost:3000', 'http://localhost:3002', 'http://localhost:3003'] }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/MongoConnection', mongoRoutes);
app.use('/api/Query', queryRoutes);
app.use('/api/AIProviderSettings', aiRoutes);
app.use('/api/OpenAISettings', openAIRoutes);
app.use('/api/QueryLog', queryLogRoutes);
app.use('/api/QueryProfiler', queryProfilerRoutes);
app.use('/api/MongoSchema', schemaRoutes);
app.use('/api/AIQueryGenerator', aiQueryGeneratorRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    } else {
      console.log('No MONGO_URI provided; using in-memory mode');
    }

    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
