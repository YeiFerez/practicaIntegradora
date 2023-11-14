import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import roleAuth from "../middlewares/role.controller.js";

const router = Router();

router.get("/", productsController.getProduct);

router.get("/:pid", productsController.getProducts);

router.post(
  "/",
  roleAuth(["admin", "premium"]),
  productsController.insertProductController
);

router.put(
  "/:pid",
  roleAuth(["admin", "premium"]),
  productsController.editProductController
);

router.delete("/:pid",roleAuth(["admin", "premium"]),productsController.eraseProductController
);

router.post(
  "/mockingproducts",
  roleAuth(["admin", "premium"]),
  productsController.mockingProductsController
);

export default router;
