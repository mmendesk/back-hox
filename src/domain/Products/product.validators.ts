import { Utils } from "../Utils/index";
import * as Yup from "yup";
import productEntity from "./product.entity";

const yupConfig = {
  strict: false,
  abortEarly: true,
  stripUnknown: true,
  recursive: true,
};

const utils = new Utils();

export const createValidator = (data: any) => {
  const ProductschemaValidator = Yup.object({
    name: Yup.string()
      .required("Nome é obrigatório")
      .test(async function (name: string) {
        const { path, createError } = this;

        const existCategorie = await productEntity.findOne({
          name: name,
        });

        if (existCategorie) {
          return createError({
            path,
            message: "Nome de categoria já cadastrado",
          });
        }
        return true;
      }),
    price: Yup.string().required("Preço é obrigatório"),
    expirationDate: Yup.string().required("Data é obrigatório"),
    manufacturingDate: Yup.string().required("Data é obrigatório"),
    perishableProduct: Yup.boolean().required("Deve ser enviado"),
  });

  return ProductschemaValidator.validate(data, yupConfig);
};
