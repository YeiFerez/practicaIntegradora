import { HTTP_STATUS, HttpError  } from "../utils/recursos.js";
import UserDTO from "../dto/user.dto.js";

class SessionsRepository {
	constructor(dao) {
		this.dao = dao;
	}

	async getLogin(req, res) {
		try {
			return await this.dao.getLogin(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getRegister(req, res) {
		try {
			return await this.dao.getRegister(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getCurrent(req, res) {
		try {
			const { user } = req.session;
			const currentUser = new UserDTO(user);
			return currentUser;
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getGithub(req, res) {
		try {
			return await this.dao.getGithub(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getGithubCallback(req, res) {
		try {
			return await this.dao.getGithubCallback(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getLogout(req, res) {
		try {
			return await this.dao.getLogout(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getRestore(req, res) {
		try {
			return await this.dao.getRestoreDao(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getRestoreCallback(req, res) {
		try {
			return await this.dao.getRestoreCallbackDao(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getPremium(req, res) {
		try {
			return await this.dao.getPremiumDao(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getUser(req, res) {
		try {
			return await this.dao.getUserDao(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}
}

export default SessionsRepository;
