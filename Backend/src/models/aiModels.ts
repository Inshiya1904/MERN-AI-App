import mongoose, { Document } from "mongoose";

export interface IAI extends Document {
  prompt: string;
  response: string;
}

const aiSchema = new mongoose.Schema<IAI>(
  {
    prompt: { type: String, required: true },
    response: { type: String, required: true },
  },
  { timestamps: true }
);

const AI =  mongoose.model<IAI>("AI", aiSchema);
export default AI