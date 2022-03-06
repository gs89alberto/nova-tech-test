import mongoose from 'mongoose';
import { Nomination as nominationModel, NominationDocument, NominationInput } from '../../src/models/nomination.model';
import { User as userModel } from '../../src/models/user.model';
import * as nominationController from '../../src/controllers/nomination.controller';
import { seedUsers } from '../../src/controllers/user.controller';
import mongooseLoader from '../../src/loaders/mongoose';

describe('Nomination controller tests', () => {
  beforeAll(async () => {
    await mongooseLoader();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
    await nominationModel.deleteMany({});
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  it('should be defined', () => {
    expect.assertions(1);
    expect(nominationController).toBeDefined();
  });

  it('Nomination collection is correctly seeded', async () => {
    expect.assertions(2);
    expect(await nominationModel.countDocuments()).toEqual(0);

    await nominationController.seedNominations();

    expect(await nominationModel.countDocuments()).toEqual(2);
  });

  it('Nomination exists is working correctly', async () => {
    expect.assertions(2);
    await nominationController.seedNominations();
    const referrerExists = 'novatechtest123@gmail.com';
    expect(await nominationController.nominationExists(referrerExists)).toBeTruthy();
    const referrerNotExists = 'notExisting@email.com';
    expect(await nominationController.nominationExists(referrerNotExists)).toBeFalsy();
  });

  it('Nomination is correctly created', async () => {
    expect.assertions(6);
    await nominationController.seedNominations();
    const newNomination: NominationInput = {
      candidate: 'candidatetest@email.com',
      referrer: 'referrertest@email.com',
      shortExplanation: 'test explanation',
      score: [2, 3],
      rejected: true,
    };
    const createdNomination: NominationDocument = await nominationController.createNomination(newNomination);
    expect(createdNomination.candidate).toEqual(newNomination.candidate);
    expect(createdNomination.referrer).toEqual(newNomination.referrer);
    expect(createdNomination.shortExplanation).toEqual(newNomination.shortExplanation);
    expect(createdNomination.score[0]).toBe(newNomination.score[0]);
    expect(createdNomination.score[1]).toBe(newNomination.score[1]);
    expect(createdNomination.rejected).toEqual(newNomination.rejected);
  });

  it('Nominations are correctly retrieved', async () => {
    expect.assertions(2);
    await nominationController.seedNominations();
    
    const nominations: NominationDocument[] = await nominationController.getNominations(false);
    expect(nominations).toHaveLength(1);
    expect(nominations[0].candidate).toBe('lewish@email.com');

  });
});
