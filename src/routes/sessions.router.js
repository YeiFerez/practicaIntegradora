import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";

const router=Router();

router.post('/register', sessionsController.register);

router.post('/login', sessionsController.login);

router.post('/logout', sessionsController.logout);

router.get('/current', sessionsController.current);

router.get('/github', sessionsController.github);
  
router.get('/githubCallback', sessionsController.githubCallback);
  
export default router;