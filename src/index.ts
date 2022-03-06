import express from 'express';
import startServer from './servers/server';

const app = express();

startServer(app);
