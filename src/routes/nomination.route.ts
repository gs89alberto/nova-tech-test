import { Router } from 'express';
import { createNomination, getNominations, seedNominations } from '../services/nomination.service';
import isAdminMiddleware from '../middlewares/isAdmin.middleware';

export default (app: Router) => {
  const router = Router();
  app.use('/nominations', router);

  router.post('/vote', createNomination);
  router.post('/list', isAdminMiddleware, getNominations);
  router.get('/seed', seedNominations);
};
