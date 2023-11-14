import { HTTP_STATUS, HttpError  } from "../utils/recursos.js";


class ViewsRepository {
	constructor(dao) {
		this.dao = dao;
	}

	async getHome(req, res) {
		try {
			return await this.dao.getHome(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getLogin() {
		try {
			return await this.dao.getLogin();
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getRegister() {
		try {
			return await this.dao.getRegister();
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getProducts(req, res) {
		try {
			return await this.dao.getProducts(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getProduct(req, res) {
		try {
			return await this.dao.getProduct(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getCart(req, res) {
		try {
			return await this.dao.getCart(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getChat(req, res) {
		try {
			return await this.dao.getChatDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}

	async getRestore(req, res) {
		try {
			return await this.dao.getRestoreDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}

	async getUpload(req, res) {
		try {
			return await this.dao.getUploadDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}

	async getAdminViews(req, res) {
		try {
			return await this.dao.getAdminViewsDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}

}

export default ViewsRepository;
