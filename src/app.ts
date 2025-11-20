import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { json } from 'express';
import { authRouter } from './modules/auth/auth.routes';
import { usersRouter } from './modules/users/users.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(json());
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'auth-service' });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);

  app.use(errorHandler);

  return app;
}
