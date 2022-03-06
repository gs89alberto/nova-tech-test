import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { User } from '../models/user.model';

async function isAdminMiddleware(request: Request, response: Response, next: NextFunction) {
  try {
    if (!request.body.email) {
      throw new Error('An email is required to perform this action');
    }
    const user = await User.findOne({ email: request.body.email });
    if (!user || user.role !== 0) {
      throw new Error("You can't perform this action");
    }
    next();
  } catch (error) {
    response.status(403).send({
      error: error.message,
    });
  }
}

export default isAdminMiddleware;
