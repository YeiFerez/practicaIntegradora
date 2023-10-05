import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import roleAuth from "../controllers/role.controller.js";

const router = Router();

router.get("/", roleAuth('admin'),cartsController.carts);

router.get("/:cid", roleAuth(['admin', 'premium', 'user']), cartsController.cart);

router.post('/', roleAuth(['admin', 'premium']), cartsController.createCart);

router.post('/:cid/product/:pid', roleAuth(['premium', 'user']), cartsController.addProduct);

router.put('/:cid', roleAuth(['premium', 'user']), cartsController.updateCart);

router.put('/:cid/product/:pid', roleAuth(['premium', 'user']), cartsController.updateProduct);

router.delete('/:cid', roleAuth(['premium', 'user']), cartsController.clearCart);
  
router.delete('/:cid/product/:pid', roleAuth(['premium', 'user']), cartsController.clearProduct);
  
router.post('/:cid/purchase', roleAuth(['premium', 'user']), cartsController.purchase);

export default router;
