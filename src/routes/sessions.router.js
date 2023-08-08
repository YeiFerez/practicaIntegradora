import { Router } from "express";
import userModel from "../dao/models/Users.model.js";
import passport from "passport";

const router=Router();

router.post("/register", passport.authenticate("register"), async (req, res) => {
	try {
		req.session.user = {
			first_name: req.user.first_name,
			last_name: req.user.last_name,
			email: req.user.email,
      age: req.user.age,
		};
		return res.status(200).send({status: 'success', response: 'User created'});
	} catch (err) {
		return res.status(500).json({ status: 'error', response: err.message });
	};
});


router.post("/login", passport.authenticate('login'), async (req, res) => {
	try {
		const email = req.user.email;
		await userModel.findOne({email});
		req.session.user = {
			first_name: req.user.first_name,
			last_name: req.user.last_name,
			email: req.user.email,
		};
		return res.status(200).send({status: 'success', response: 'User loged'});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

router.post("/logout", (req, res) => {
    try {
      // Destruir la sesión actual
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Error al cerrar sesión" });
        }
        // Redireccionar a la página de inicio o a la página deseada después de cerrar sesión
        res.redirect("/");
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  router.get('/github', passport.authenticate('github'), async (req, res) => {});
  
  router.get('/githubCallback', passport.authenticate('github'), async (req, res) => {
		req.session.user = req.user;
		res.redirect('/');
	}
);
  
export default router;