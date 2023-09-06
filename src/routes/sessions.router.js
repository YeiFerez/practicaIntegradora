import { Router } from "express";
import passport from "passport";
import sessionsController from "../controllers/sessions.controller.js";

const router=Router();

router.post("/register", passport.authenticate("register"), sessionsController.register);


router.post("/login", passport.authenticate('login'), sessionsController.login);

router.post("/logout", sessionsController.logout);

router.post("/current", passport.authenticate('register'), sessionsController.current);


router.get('/github', passport.authenticate('github'), sessionsController.github);
  
router.get('/githubCallback', passport.authenticate('github'),sessionsController.githubCallback );
  
export default router;