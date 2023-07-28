import { registerAs } from '@nestjs/config';

const config = registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
  },
  secret: process.env.SECRET,
  apikey: process.env.API_KEY,
}));

export type Config = typeof config;

export default config;
