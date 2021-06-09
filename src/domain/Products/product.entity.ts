import { model, Schema, Types, Document } from "mongoose";

export interface IProducts extends Document {
  categorieId: Types.ObjectId;
  name: string;
  manufacturingDate: string;
  expirationDate: string;
  price: number;
  perishableProduct: boolean;
  updated_at?: Date;
  created_at?: Date;
}

function getPrice(num) {
  return (num / 100).toFixed(2);
}

const ProductsSchema: Schema = new Schema(
  {
    categorieId: { type: Object, required: true },
    name: { type: String, required: true },
    manufacturingDate: { type: String, required: true },
    expirationDate: { type: String, required: true },
    price: { type: Number, get: getPrice, required: true },
    perishableProduct: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProductsSchema.path("price").get(function (num) {
  return (num / 100).toFixed(2);
});

ProductsSchema.path("price").set(function (num) {
  return num * 100;
});

export default model<IProducts>("Product", ProductsSchema);
