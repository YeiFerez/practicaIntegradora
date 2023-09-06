import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import { authToken } from "../utils/jwt.utils.js";

const router = Router();

router.get("/register",viewsController.register );

router.get("/login", viewsController.login );

router.get("/", viewsController.home);

router.get("/products", viewsController.products);

router.get("/products/:pid", viewsController.product);

router.get("/carts", viewsController.carts);

router.get("/exclusive", authToken, viewsController.exclusive);

router.get("/chat", viewsController.chat);

export default router;
