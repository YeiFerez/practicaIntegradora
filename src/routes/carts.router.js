import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import roleAuth from "../controllers/role.controller.js";

const router = Router();

router.get("/", cartsController.carts);

router.get("/:cid", cartsController.cart);

router.post('/', roleAuth('admin'), cartsController.createCart);

router.post('/:cid/product/:pid', roleAuth('user'), cartsController.addProduct);

router.put('/:cid', roleAuth('user'), cartsController.updateCart);

router.put('/:cid/product/:pid', roleAuth('user'), cartsController.updateProduct);

router.delete('/:cid', roleAuth('user'), cartsController.clearCart);
  
router.delete('/:cid/product/:pid', roleAuth('user'), cartsController.clearProduct);
  
router.post('/:cid/purchase', roleAuth('user'), cartsController.purchase);

export default router;
