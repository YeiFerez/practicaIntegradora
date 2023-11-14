import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import roleAuth from "../middlewares/role.controller.js";
import upload from "../middlewares/multerConfig.js";

const router = Router();

router.post("/premium/:uid", usersController.premium);

router.post("/user/:uid", usersController.user);

// Ruta para cargar documentos
router.post("/:uid/documents", roleAuth(["premium", "user"]), upload.array('documents', 5), usersController.upload);

// Ruta para cargar imágenes de perfil
router.post("/:uid/profiles",roleAuth(["premium", "user"]), upload.single('profile'), usersController.uploadfile);

// Ruta para cargar imágenes de productos
router.post("/:uid/products",roleAuth(["premium", "user"]), upload.single('product'), usersController.uploadfile);

router.get("/", roleAuth("admin"), usersController.getAllUser);

router.delete("/deleteInactive",roleAuth('admin'), usersController.deleteInactiveUsers);

router.delete('/:uid', roleAuth('admin'), usersController.deleteUser);


export default router;
