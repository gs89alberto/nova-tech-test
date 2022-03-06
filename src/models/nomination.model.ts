import mongoose, { Schema, Model, Document } from 'mongoose';

type NominationDocument = Document & {
  candidate: string;
  referrer: string;
  shortExplanation: string;
  score: [number, number];
  rejected: boolean;
};

type NominationInput = {
  candidate: NominationDocument['candidate'];
  referrer: NominationDocument['referrer'];
  shortExplanation: NominationDocument['shortExplanation'];
  score: NominationDocument['score'];
  rejected: NominationDocument['rejected'];
};

const nominationsSchema = new Schema(
  {
    candidate: {
      type: Schema.Types.String,
      required: true,
    },
    referrer: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    shortExplanation: {
      type: Schema.Types.String,
      required: true,
    },
    score: {
      type: [{ type: Schema.Types.Number, min: 0, max: 10 }],
      required: true,
    },
    rejected: {
      type: Schema.Types.Boolean,
      required: true,
    },
  },
  {
    collection: 'nominations',
    timestamps: true,
    versionKey: false,
  },
);

const Nomination: Model<NominationDocument> = mongoose.model<NominationDocument>('Nomination', nominationsSchema);

export { Nomination, NominationInput, NominationDocument };
