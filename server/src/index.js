import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/db.js';
import env from './config/env.js';
import authRouter from './routes/authRoutes.js';
import campaignRouter from './routes/campaignRoutes.js';

const app = express();

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'asa-server' });
});

app.use('/api/auth', authRouter);
app.use('/api/campaigns', campaignRouter);

connectDatabase().then(() => {
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
});
