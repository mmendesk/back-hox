import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  active: boolean;
  updated_at?: Date;
  created_at?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
