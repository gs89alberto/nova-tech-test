import { User, UserDocument } from '../models/user.model';
import { usersSeed } from '../database/seed/users.seed';

const seedUsers = async (): Promise<UserDocument[]> => {
  return await User.create(usersSeed);
};

const userExists = async (email: string): Promise<boolean> => {
  return await User.exists({ email });
};
export { seedUsers, userExists };
