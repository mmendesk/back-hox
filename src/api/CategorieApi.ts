import { Router, Request, Response, NextFunction } from "express";
import AuthenticationService from "src/domain/Authentication/authentication.service";
import { authUserMiddleware } from "src/middlewares/AuthMiddleware";
import { CategorieService } from "../domain/Categories/categorie.service";
export default class CategorieApi {
  public router: Router;
  private categorieService = new CategorieService();

  private authService = new AuthenticationService();
  constructor() {
    this.router = Router();
    this.router.post("/categorie", this.createCategorie);
    this.router.get("/categories", authUserMiddleware, this.getAll);
    this.router.get("/categorie/:id", this.getCategorieId);
    this.router.put("/categorie-update/:id", this.updateCategorie);
  }

  private createCategorie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.categorieService.create(req.body);
      return res.json({
        msg: "Criado com sucesso",
      });
    } catch (e) {
      next(e);
    }
  };

  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = this.authService.getPayload(req);
      return res.json(
        await this.categorieService.getAllCategorie(payload.categorieId)
      );
    } catch (e) {
      next(e);
    }
  };

  private getCategorieId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(
        await this.categorieService.getCategorieById(req.params.id)
      );
    } catch (err) {
      next(err);
    }
  };

  private updateCategorie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(await this.categorieService.updateCategorie(req.body));
    } catch (e) {
      next(e);
    }
  };
}
