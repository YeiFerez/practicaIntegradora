import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import roleAuth from "../middlewares/role.controller.js";

const router = Router();

router.get("/register", viewsController.register);

router.get("/login", viewsController.login);

router.get("/", viewsController.home);

router.get("/products", viewsController.products);

router.get("/products/product/:pid", viewsController.product);

router.get("/cart/:cid", viewsController.cart);

router.get("/chat", viewsController.chat);

router.get("/restore", roleAuth("user"), viewsController.restore);

router.get("/upload", viewsController.upload);

router.get('/admin/users/:uid', roleAuth('admin'), viewsController.adminUserView);

export default router;
