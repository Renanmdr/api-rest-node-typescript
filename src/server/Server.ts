import express from 'express';
import 'dotenv/config';
import './shared/services/translationsYup';
import cors from 'cors';
import { router } from './routes';

const server = express();

server.use(cors({
  origin: process.env.ENABLED_CORS?.split(';') || []
}));

server.use(express.json());

server.use(router);

export { server };