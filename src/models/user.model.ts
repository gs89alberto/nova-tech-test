import mongoose, { Schema, Model, Document } from 'mongoose';

type UserDocument = Document & {
  fullName: string;
  email: string;
  role: number;
};

type UserInput = {
  fullName: UserDocument['fullName'];
  email: UserDocument['email'];
  role: UserDocument['role'];
};

const usersSchema = new Schema(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    role: {
      type: Schema.Types.Number,
      min: 0,
      max: 1,
      default: 1,
    },
  },
  {
    collection: 'users',
    timestamps: true,
    versionKey: false,
  },
);

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', usersSchema);

export { User, UserInput, UserDocument };
