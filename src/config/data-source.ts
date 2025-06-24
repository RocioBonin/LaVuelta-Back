import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from "@nestjs/config";

dotenvConfig({ path: '.env.development.local' });

const isRender = process.env.ENVIRONMENT === 'RENDER';

const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: isRender ? process.env.DB_HOST_RENDER : process.env.DB_HOST_LOCAL,
  port: parseInt(isRender ? process.env.DB_PORT_RENDER! : process.env.DB_PORT_LOCAL!),
  username: isRender ? process.env.DB_USERNAME_RENDER : process.env.DB_USERNAME_LOCAL,
  password: isRender ? process.env.DB_PASSWORD_RENDER : process.env.DB_PASSWORD_LOCAL,
  database: isRender ? process.env.DB_NAME_RENDER : process.env.DB_NAME_LOCAL,
  synchronize: false,
  dropSchema: false,
  logging: ['error'],
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
};

export const dbConfig = registerAs('postgres', () => dataSourceConfig);

export default new DataSource(dataSourceConfig);


