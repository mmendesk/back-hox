import * as express from "express";
import UserApi from "../api/UserApi";
import CategorieApi from "src/api/CategorieApi";
import ProductApi from "src/api/ProductApi";
const router = express.Router();

router.use("/", new UserApi().router);
router.use("/", new CategorieApi().router);
router.use("/", new ProductApi().router);

module.exports = router;
