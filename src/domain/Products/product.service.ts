import { Types } from "mongoose";
import { Utils } from "../Utils/index";
import { createValidator } from "./product.validators";
import { CategorieService } from "../Categories/categorie.service";
import productEntity from "./product.entity";

interface IProducts {
  _id?: Types.ObjectId;
  categorieId: Types.ObjectId;
  name: string;
  manufacturingDate: Date;
  expirationDate: Date;
  price: string;
  perishableProduct: boolean;
}

export class ProductService {
  private products: Array<IProducts> = [];

  private utils = new Utils();
  private categorieService = new CategorieService();
  constructor() {}

  async create(data: IProducts, categorieId: string) {
    data.categorieId = Types.ObjectId(categorieId);
    try {
      await createValidator(data);
    } catch (e) {
      this.utils.makeException(400, e.errors);
    }

    console.log(data);

    let categorieData = await this.categorieService.getCategorieById(
      categorieId
    );

    const productId = Types.ObjectId();

    data._id = productId;
    data.categorieId = Types.ObjectId(categorieId);

    await productEntity.create({ ...data });
    console.log(data);

    return {
      ...data,
    };
  }

  async getAllProduct(productId: string) {
    return await productEntity.find({}).sort({ _id: -1 });
  }

  async getProductId(productId: string) {
    const product = await productEntity.findById(Types.ObjectId(productId));
    return product;
  }

  async updateProduct(name: string) {
    await productEntity.updateMany(
      {
        products: name,
      },
      { $pull: { products: name } }
    );

    return { msg: "Produto atualizado com sucesso" };
  }
}
