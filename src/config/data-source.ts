import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../modules/users/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'auth_user',
  password: process.env.DB_PASSWORD || 'auth_password',
  database: process.env.DB_NAME || 'auth_db',
  entities: [User],
  synchronize: true, // PROD için migration'a çevrilebilir
  logging: false
});
