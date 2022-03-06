import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from '../routes';
import { serverConfig } from '../config/config';

import errorMiddleware from '../middlewares/error.middleware';
import { createWriteStream } from '../utils/logs';

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(morgan('combined', { stream: createWriteStream() }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(serverConfig.api.prefix, routes());

  app.use(errorMiddleware);
};
