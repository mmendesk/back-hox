import { model, Schema, Document } from "mongoose";

export interface ICategorie extends Document {
  name: string;
  active: boolean;
  updated_at?: Date;
  created_at?: Date;
}

const CategorieSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<ICategorie>("Categorie", CategorieSchema);
