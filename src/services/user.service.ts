import { NextFunction, Request, Response } from 'express';
import * as userController from '../controllers/user.controller';

const seedUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userController.seedUsers();
    return res.status(201).json({ message: 'Users correctly seeded' });
  } catch (error) {
    next(error);
  }
};

export { seedUsers };
