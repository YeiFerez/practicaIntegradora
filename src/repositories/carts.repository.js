import { HTTP_STATUS, HttpError  } from "../utils/recursos.js";

class CartsRepository {
	constructor(dao) {
		this.dao = dao;
	}

	async getCarts() {
		try {
			return await this.dao.getAllCarts();
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getCart(cid) {
		try {
			return await this.dao.getCartById(cid);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async createCart() {
		try {
			const cart = {
				products: [],
			};
			return await this.dao.createCart(cart);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async createProduct(req, res, cid, pid) {
		try {
			return await this.dao.addProductToCart(req, res, cid, pid);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async updateCart(req, res, cid, newCart) {
		try {
			return await this.dao.updateCart(req, res, cid, newCart);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async updateProduct(cid, pid, quantity) {
		try {
			if (quantity < 1 || typeof(quantity) != 'number') {
				return new HttpError(`'${quantity}' valor invalido para cantidad.`, HTTP_STATUS.BAD_REQUEST);
			}
			return await this.dao.updateProductQuantity(cid, pid, quantity);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async deleteCart(cid) {
		try {
			const cart = {
				products: [],
			};
			return await this.dao.clearCart(cid, cart);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async deleteProduct(cid, pid) {
		try {
			return await this.dao.removeProductFromCart(cid, pid);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async purchaseCart(req, res) {
		try {
			return await this.dao.purchaseCart(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}
}

export default CartsRepository;
