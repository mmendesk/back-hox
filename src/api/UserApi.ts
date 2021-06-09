import { Router, Request, Response, NextFunction } from "express";
import AuthenticationService from "../domain/Authentication/authentication.service";
import { UserService } from "../domain/User/user.service";
export default class UserApi {
  public router: Router;
  private userService = new UserService();
  private authService = new AuthenticationService();
  constructor() {
    this.router = Router();
    this.router.post("/users", this.createUser);
    this.router.post("/auth", this.session);
  }

  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.userService.create(req.body);
      return res.json({
        msg: "Criado com sucesso",
      });
    } catch (e) {
      next(e);
    }
  };

  private session = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json({
        token: await this.userService.createSession(req.body),
      });
    } catch (e) {
      next(e);
    }
  };
}
