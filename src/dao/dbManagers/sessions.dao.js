import passportCall from "../../utils/passport.utils.js";
import {sendRestoreEmail} from "../../utils/email.utils.js"
import userModel from "../models/Users.model.js";
import { createHash, isValidPassword } from "../../utils.js";
import { faker } from '@faker-js/faker/locale/es';

export class SessionsManagerDAO {
	constructor() {}

	async getLogin(req, res) {
		try {
			return await passportCall(req, res, 'login')
			
        
			
		} catch (error) {
			return `${error}`;
		}
	}

	async getRegister(req, res) {
		try {
			return await passportCall(req, res, 'register')
		} catch (error) {
			return `${error}`;
		}
	}

	async getGithub(req, res) {
		try {
			return await passportCall(req, res, 'github')
		} catch (error) {
			return `${error}`;
		}
	}

	async getGithubCallback(req, res) {
		try {
			return await passportCall(req, res, 'github')
		} catch (error) {
			return `${error}`;
		}
	}

	async getLogout(req, res) {
		try {
		  const { user } = req.session;
	  
		  if (user) {
			// Cargar el usuario nuevamente desde la base de datos usando su ID
			const userId = user._id; // Suponiendo que _id es el campo de identificación único del usuario
	  
			// Cargar el usuario desde la base de datos
			const userFromDB = await userModel.findById(userId);
	  
			if (userFromDB) {
			  // Actualizar last_connection en el usuario
			  userFromDB.last_connection = new Date();
			  await userFromDB.save(); // Guardar los cambios en la base de datos
			} else {
			  console.log('Usuario no encontrado en la base de datos.');
			}
		  }
	  
		  // Destruir la sesión
		  req.session.destroy();
		} catch (error) {
		  return `${error}`;
		}
	  }
	  

	async getRestoreDao(req, res) {
		try {
			const { user } = req.session;
			const restoreEmail = user.email;
			if (!restoreEmail)
				return `El usuario no tiene email para enviar la peticion.`;

			const cookieId = faker.database.mongodbObjectId();
			res.cookie('restoreCookie', cookieId, {
				signed: true,
				maxAge: 60 * 60 * 1000,
			});
			return await sendRestoreEmail(restoreEmail);
		} catch (error) {
			return `${error}`;
		}
	}

	async getRestoreCallbackDao(req, res) {
		try {
			const { user } = req.session;
			const { email, password } = req.body;
			if (isValidPassword(user, password))
				return `No se puede restaurar con la misma password.`;
			const newPassword = createHash(password);
			res.clearCookie('restoreCookie');
			return await userModel.updateOne({ email }, { password: newPassword });
		} catch (error) {
			return `${error}`;
		}
	}


}