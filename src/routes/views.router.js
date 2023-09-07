import { Router } from "express";
import viewsController, { home } from "../controllers/views.controller.js";
import { authToken } from "../utils/jwt.utils.js";

const router = Router();

router.get('/register', viewsController.register);

router.get('/login', viewsController.login);

router.get('/', viewsController,home);

router.get('/products', viewsController.products);

router.get('/product/:pid', viewsController.product);

router.get('/cart/:cid', viewsController.cart);

router.get('/chat', roleAuth('user'), viewsController.chat);

export default router;
