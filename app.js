import e from 'express';
import './src/configs/database.config.js';
import { Server } from './src/configs/server.confing.js';
import { ErrorHandlers } from './src/helpers/errors/error.handler.js';
import { setupMiddlewares } from './src/middlewares/middlewares.js';

const main = () => {
  const app = e();

  setupMiddlewares(app, e);
  app.use(...ErrorHandlers);

  Server(app);
};

main();
