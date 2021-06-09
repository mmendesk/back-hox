import { createValidator } from "./categorie.validators";
import { Utils } from "../Utils/index";
import categorieEntity from "./categorie.entity";
import { Types } from "mongoose";
interface ICategorie {
  active: boolean;
  name: string;
}

export class CategorieService {
  private utils = new Utils();

  constructor() {
    this.utils = new Utils();
  }

  ////Create Categoire
  async create(data: ICategorie) {
    try {
      await createValidator(data);
    } catch (e) {
      this.utils.makeException(401, e.errors);
    }
    console.log(data);

    await categorieEntity.create({ ...data });
    return { msg: "Criado com sucesso" };
  }

  async getAllCategorie(categorieId: string) {
    return await categorieEntity.find({}).sort({ _id: -1 });
  }

  async getCategorieById(categorieId: string) {
    const categorie = await categorieEntity.findById(
      Types.ObjectId(categorieId)
    );
    return categorie;
  }

  async updateCategorie(name: string) {
    await categorieEntity.updateMany(
      {
        categories: name,
      },
      { $pull: { categories: name } }
    );

    return { msg: "Categoria atualizado com sucesso" };
  }
}
