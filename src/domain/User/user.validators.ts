import { Types } from "mongoose";
import * as Yup from "yup";
import Entity from "./user.entity";

const yupConfig = {
  strict: false,
  abortEarly: true,
  stripUnknown: true,
  recursive: true,
};

export const createValidator = (data: any) => {
  const userCreateSchema = Yup.object({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório")
      .test(async function (email: string) {
        const { path, createError } = this;

        const existUsers = await Entity.findOne({
          email: email,
        });

        if (existUsers) {
          return createError({ path, message: "Email ja cadastrado" });
        }
        return true;
      }),
    password: Yup.string().required("Senha é obrigatória"),
    active: Yup.boolean().required("Ativo deve ser enviado"),
  });

  return userCreateSchema.validate(data, yupConfig);
};

export const updateValidator = (data: any, userId: string) => {
  const userCreateSchema = Yup.object({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório")
      .test(async function (email: string) {
        const { path, createError } = this;

        const existUsers = await Entity.findOne({
          email: email,
        });

        if (existUsers && existUsers._id.toString() !== userId.toString()) {
          return createError({ path, message: "email ja cadastrado" });
        }

        return true;
      }),
    active: Yup.boolean().required("Ativo deve ser enviado"),
  });

  return userCreateSchema.validate(data, yupConfig);
};

export const createSessionValidator = (data: {
  email: string;
  password: string;
}) => {
  const userSessionSchema = Yup.object({
    email: Yup.string().required("Email é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
  });
  return userSessionSchema.validate(data, yupConfig);
};
