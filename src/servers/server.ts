import { Application as expressApp } from 'express';
import loaders from '../loaders';
import { serverConfig } from '../config/config';

const startServer = async (app: expressApp) => {
  await loaders({ expressApp: app });
  app.listen(serverConfig.app.port, async () => {
    console.log(`Application started on URL ${serverConfig.app.host}:${serverConfig.app.port} 🎉`);
  });
};

export default startServer;
