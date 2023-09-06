import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

router.get("/", cartsController.carts);

router.get("/:id", cartsController.cart);

router.post("/", cartsController.createCart);

router.post("/:cid/product/:pid", cartsController.addProduct);

router.put("/:id/products/:productId/quantity", cartsController.updateProduct);
  
router.delete("/:id/products/:productId", cartsController.deleteProduct);
  
router.delete("/:id", cartsController.deleteCart);

export default router;
