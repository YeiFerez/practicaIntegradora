import { HTTP_STATUS, HttpError  } from "../utils/recursos.js";

class UsersRepository {
	constructor(dao) {
		this.dao = dao;
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

	
	async uploadDocuments(req, res) {
		try {
			return await this.dao.uploadDocumentsDao(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async uploadfiles(req, res) {
		try {
			return await this.dao.uploadFileDao(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}
	
	async getAllUsers(req, res) {
		try {
			return await this.dao.getAllUsersDao(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	} 

	async deleteInactiveUser(req, res) {
		try {
			return await this.dao.deleteInactiveUsersDao(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	} 

	async deleteUsers(req, res) {
		try {
			return await this.dao.deleteUserDao(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	} 
}

export default UsersRepository;
