import { NextFunction, Request, Response } from 'express';
import { NominationInput } from '../models/nomination.model';
import * as nominationController from '../controllers/nomination.controller';
import { userExists } from '../controllers/user.controller';
import { sendRejectionMessage } from '../utils/mail';

const membership = async (email: string): Promise<boolean> => {
  return await userExists(email);
};

const validateNomination = async (nominationParameters): Promise<void> => {
  const { candidate, referrer, shortExplanation, score } = nominationParameters;
  const hasRequiredFields: boolean = [candidate, referrer, shortExplanation, score].every((field) => field);
  if (!hasRequiredFields) {
    throw new Error('All the fields(candidate, referrer, shortExplanation and score) are required.');
  }

  if (!(await membership(candidate)) || !(await membership(referrer))) {
    throw new Error('Candidate and Referrer must be Nova members to vote.');
  }

  if (candidate === referrer) {
    throw new Error("A referrer can't nominate itself");
  }

  if (await nominationController.nominationExists(referrer)) {
    throw new Error('Referrer already in the network. Sorry you can only nominate for a candidate once.');
  }
};

const createNomination = async (req: Request, res: Response, next: NextFunction) => {
  const { candidate, referrer, shortExplanation, score } = req.body;
  try {
    await validateNomination({ candidate, referrer, shortExplanation, score });

    let rejected: boolean = false;
    if (parseInt(score[1]) < 8) {
      rejected = true;
      sendRejectionMessage(candidate, referrer);
    }
    const nominationInput: NominationInput = {
      candidate,
      referrer,
      shortExplanation,
      score,
      rejected,
    };

    const nominationCreated = await nominationController.createNomination(nominationInput);

    return res.status(201).json({ data: nominationCreated });
  } catch (error) {
    next(error);
  }
};

const getNominations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nominations = await nominationController.getNominations(false);
    return res.status(200).json({ data: nominations });
  } catch (error) {
    next(error);
  }
};

const seedNominations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await nominationController.seedNominations();
    return res.status(201).json({ message: 'Nominations correctly seeded' });
  } catch (error) {
    next(error);
  }
};

export { createNomination, getNominations, seedNominations };
