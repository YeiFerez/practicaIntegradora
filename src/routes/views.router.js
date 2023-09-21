import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import roleAuth from "../controllers/role.controller.js";

const router = Router();

router.get('/register', viewsController.register);

router.get('/login', viewsController.login);

router.get('/', viewsController.home);

router.get('/products', viewsController.products);

router.get('/product/:pid', viewsController.product);

router.get('/carts/:cid', viewsController.cart);

router.get('/chat', roleAuth('user'), viewsController.chat);

export default router;
