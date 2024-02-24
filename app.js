import express from 'express';
import { config } from 'dotenv';
import callEntry from './routes/callEntryRoutes.js';

import cors from 'cors';

config({
  path: './config/config.env',
});
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true, // otherwise we cannot access req.body;
  })
);

app.use('/api', callEntry);

export default app;
