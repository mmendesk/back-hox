import { createValidator, createSessionValidator } from "./user.validators";
import { Utils } from "../Utils/index";
import { generate, verify } from "password-hash";
import userEntity from "./user.entity";
import AuthenticationService from "../Authentication/authentication.service";
interface iUser {
  active: boolean;
  name: string;
  password: string;
  email: string;
  firstUser: boolean;
}

export class UserService {
  private utils = new Utils();
  private authenticationService: AuthenticationService;

  constructor() {
    this.utils = new Utils();
    this.authenticationService = new AuthenticationService();
  }
  ////Create User
  async create(data: iUser) {
    try {
      await createValidator(data);
    } catch (e) {
      this.utils.makeException(401, e.errors);
    }

    data.password = generate(data.password);
    await userEntity.create({ ...data });
    return { msg: "Criado com sucesso" };
  }

  ////Session user
  async createSession(data: { email: string; password: string }) {
    try {
      await createSessionValidator(data);
    } catch (e) {
      this.utils.makeException(401, e.errors);
    }
    let userExist = await userEntity.findOne({
      email: data.email,
    });

    if (!userExist) {
      this.utils.makeException(401, ["Usuário não cadastrado"]);
    }
    if (!verify(data.password, userExist.password)) {
      this.utils.makeException(404, ["Usuário ou senha incorreto"]);
    }
    const token = this.authenticationService.generate(userExist);
    return `Bearer ${token}`;
  }
}
