import AuthenticationService from "./../domain/Authentication/authentication.service";
import { Router, Request, Response, NextFunction } from "express";
import { authUserMiddleware } from "../middlewares/AuthMiddleware";
import { ProductService } from "src/domain/Products/product.service";

export default class ProductApi {
  public router: Router;
  public productService = new ProductService();
  private authService = new AuthenticationService();

  constructor() {
    this.router = Router();
    this.router.post("/product", authUserMiddleware, this.createProduct);
    this.router.get("/products", authUserMiddleware, this.getAll);
    this.router.get("/product/:id", authUserMiddleware, this.getProductId);
    this.router.put(
      "/product-update/:id",
      authUserMiddleware,
      this.updateProduct
    );
  }

  private createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payload = this.authService.getPayload(req);

      await this.productService.create(req.body, payload.categorieId);
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
        await this.productService.getAllProduct(payload.productId)
      );
    } catch (e) {
      next(e);
    }
  };

  private getProductId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(await this.productService.getProductId(req.params.id));
    } catch (err) {
      next(err);
    }
  };

  private updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.json(await this.productService.updateProduct(req.body));
    } catch (e) {
      next(e);
    }
  };
}
