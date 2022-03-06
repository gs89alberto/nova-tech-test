import { Router } from 'express';
import { seedUsers } from '../services/user.service';

export default (app: Router) => {
  const router = Router();
  app.use('/users', router);

  router.get('/seed', seedUsers);

};
