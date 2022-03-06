import { Nomination, NominationDocument, NominationInput } from '../models/nomination.model';
import { nominationsSeed } from '../database/seed/nominations.seed';

const nominationExists = async (referrer: string): Promise<boolean> => {
  return await Nomination.exists({ referrer });
};

const createNomination = async (nominationInput: NominationInput): Promise<NominationDocument> => {
  return await Nomination.create(nominationInput);
};

const getNominations = async (rejected: boolean): Promise<NominationDocument[]> => {
  return await Nomination.find({ rejected: rejected });
};

const seedNominations = async (): Promise<NominationDocument[]> => {
  return await Nomination.create(nominationsSeed);
};

export { nominationExists, createNomination, getNominations, seedNominations };
