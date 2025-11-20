import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import { createApp } from './app';

const port = process.env.PORT || 4000;

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const app = createApp();
    app.listen(port, () => {
      console.log(`Auth service listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start auth-service', err);
    process.exit(1);
  }
}

bootstrap();
