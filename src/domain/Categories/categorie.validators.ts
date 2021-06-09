import * as Yup from "yup";
import Entity from "./categorie.entity";

const yupConfig = {
  strict: false,
  abortEarly: true,
  stripUnknown: true,
  recursive: true,
};

export const createValidator = (data: any) => {
  const categorieCreateSchema = Yup.object({
    name: Yup.string()
      .required("Nome é obrigatório")
      .test(async function (name: string) {
        const { path, createError } = this;

        const existCategorie = await Entity.findOne({
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
    active: Yup.boolean().required("Ativo deve ser enviado"),
  });

  return categorieCreateSchema.validate(data, yupConfig);
};

export const updateValidator = (data: any) => {
  const categorieCreateSchema = Yup.object({
    name: Yup.string()
      .required("Nome é obrigatório")
      .test(async function (name: string) {
        const { path, createError } = this;

        const existCategorie = await Entity.findOne({
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
    active: Yup.boolean().required("Ativo deve ser enviado"),
  });

  return categorieCreateSchema.validate(data, yupConfig);
};
