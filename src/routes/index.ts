import { Router } from 'express';
import nomination from './nomination.route';
import user from './user.route';

export default () => {
  const app = Router();
  nomination(app);
  user(app);

  return app;
};
