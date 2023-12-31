import { cartsRepository } from '../repositories/repository.js';
import { successResponse, errorResponse, HTTP_STATUS  } from '../utils/recursos.js';

export const carts = async (req, res) => {
	try {
		const payload = await cartsRepository.getCarts();
		if (typeof payload == 'string') {
			const errorMessage = 'Error fetching carts';
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
		}
		return res.status(HTTP_STATUS.OK).json(successResponse({ carts: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
	}
};

export const cart = async (req, res) => {
	try {
		const { cid } = req.params;
		const payload = await cartsRepository.getCart(cid);
		if (typeof payload == 'string') {
			const errorMessage = 'Error fetching cart';
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
		}
		return res.status(HTTP_STATUS.OK).json(successResponse({ cart: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
	}
};

export const createCart = async (req, res) => {
	try {
		const payload = await cartsRepository.createCart();
		if (typeof payload == 'string') {
			const errorMessage = 'Error creating cart';
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
		}
		return res.status(HTTP_STATUS.OK).json(successResponse({ cart: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
	}
};

export const addProduct = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const payload = await cartsRepository.createProduct(req, res, cid, pid);
		if (typeof payload == 'string') {
			const errorMessage = 'Error inserting product into cart';
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
		}
		return res.status(HTTP_STATUS.OK).json(successResponse({ cart: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
	}
};

export const updateCart = async (req, res) => {
	try {
		const { cid } = req.params;
		const newCart = req.body;
		const payload = await cartsRepository.updateCart(req, res, cid, newCart);
		if (typeof payload == 'string') {
			const errorMessage = 'Error editing cart';
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
		}
		return res.status(HTTP_STATUS.OK).json(successResponse({ cart: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const { quantity } = req.body;
		const payload = await cartsRepository.updateProduct(cid, pid, quantity);
		if (typeof payload == 'string') {
			const errorMessage = 'Error editing product in cart';
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
		}
		return res.status(HTTP_STATUS.OK).json(successResponse({ cart: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
	}
};

export const clearCart = async (req, res) => {
	try {
		const { cid } = req.params;
		const payload = await cartsRepository.deleteCart(cid);
		if (typeof payload == 'string') {
			const errorMessage = 'Error clearing cart';
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
		}
		return res.status(HTTP_STATUS.OK).json(successResponse({ cart: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
	}
};

export const clearProduct = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const payload = await cartsRepository.deleteProduct(cid, pid);
		if (typeof payload == 'string') {
			const errorMessage = 'Error clearing product from cart';
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
		}
		return res.status(HTTP_STATUS.OK).json(successResponse({ cart: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
	}
};

export const purchase = async (req, res) => {
	try {
		const payload = await cartsRepository.purchaseCart(req, res);
		if (typeof payload == 'string') {
			const errorMessage = 'Error purchasing cart';
			return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
		}
		return res.status(HTTP_STATUS.OK).json(successResponse({ cart: payload }));
	} catch (err) {
		return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
	}
};

export default {
  carts,
  cart,
  createCart,
  addProduct,
  updateCart,
  updateProduct,
  clearCart,
  clearProduct,
  purchase
};