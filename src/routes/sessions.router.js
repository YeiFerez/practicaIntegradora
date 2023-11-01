import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";
import roleAuth from "../middlewares/role.controller.js";

const router = Router();

router.post("/register", sessionsController.register);

router.post("/login", sessionsController.login);

router.post(
  "/logout",
  roleAuth(["premium", "user"]),
  sessionsController.logout
);

router.get("/current", sessionsController.current);

router.get("/github", sessionsController.github);

router.get("/githubCallback", sessionsController.githubCallback);

router.post(
  "/restore",
  roleAuth(["premium", "user"]),
  sessionsController.restore
);

router.post(
  "/restoreCallback",
  roleAuth(["premium", "user"]),
  sessionsController.restoreCallback
);

export default router;
