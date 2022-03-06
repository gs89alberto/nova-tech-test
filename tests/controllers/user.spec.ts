import mongoose from 'mongoose';
import { User as userModel } from '../../src/models/user.model';
import * as userController from '../../src/controllers/user.controller';
import mongooseLoader from '../../src/loaders/mongoose';

describe('User controller tests', () => {
  beforeAll(async () => {
    await mongooseLoader();
  });
  beforeEach(async () => {
    await userModel.deleteMany({});
  });
  afterAll(() => {
    mongoose.disconnect();
  });
  it('should be defined', () => {
    expect.assertions(1);
    expect(userController).toBeDefined();
  });

  it('User collection is correctly seeded', async () => {
    expect.assertions(2);
    expect(await userModel.countDocuments({})).toEqual(0);

    await userController.seedUsers();

    expect(await userModel.countDocuments({})).toEqual(4);
  });
  it('User exists is working correctly', async () => {
    expect.assertions(2);
    await userController.seedUsers();
    const email1 = 'novatechtest123@gmail.com';
    expect(await userController.userExists(email1)).toBeTruthy();
    const email2 = 'notExisting@email.com';
    expect(await userController.userExists(email2)).toBeFalsy();
  });
});
