import { model, Schema, Types, Document } from "mongoose";

export interface IProducts extends Document {
  categorieId: Types.ObjectId;
  name: string;
  manufacturingDate: string;
  expirationDate: string;
  price: string;
  perishableProduct: boolean;
  updated_at?: Date;
  created_at?: Date;
}

const ProductsSchema: Schema = new Schema(
  {
    categorieId: { type: Object, required: true },
    name: { type: String, required: true },
    manufacturingDate: { type: String, required: true },
    expirationDate: { type: String, required: true },
    price: { type: String, required: true },
    perishableProduct: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IProducts>("Product", ProductsSchema);
