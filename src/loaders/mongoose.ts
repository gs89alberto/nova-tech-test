import mongoose from 'mongoose';
import { Db } from 'mongodb';
import { serverConfig } from '../config/config';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(serverConfig.db.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};
