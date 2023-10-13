import { successResponse, errorResponse, HTTP_STATUS  } from '../utils/recursos.js';
import { productsRepository } from '../repositories/repository.js';


export const getProducts = async (req, res) => {
  try {
    const payload = await productsRepository.getProducts();
    if (typeof payload === 'string') {
      const errorMessage = 'Error fetching products';
      return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
    }
    return res.status(HTTP_STATUS.OK).json(successResponse({ products: payload }));
  } catch (err) {
    return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
  }
};

export const getProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const payload = await productsRepository.getProduct(pid);
    if (typeof payload === 'string') {
      const errorMessage = 'Error fetching product';
      return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
    }
    return res.status(HTTP_STATUS.OK).json(successResponse({ product: payload }));
  } catch (err) {
    return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
  }
};

export const insertProductController = async (req, res) => {
  try {
    const productInfo = req.body;
		const { user } = req.session;
		const newProduct = {
			...productInfo,
			owner: user.email
		}
    const payload = await productsRepository.createProduct(newProduct);
    if (typeof payload === 'string') {
      const errorMessage = 'Error inserting product';
      return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
    }
    return res.status(HTTP_STATUS.OK).json(successResponse({ product: payload }));
  } catch (err) {
    return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
  }
};

export const editProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const newProduct = req.body;
    const payload = await productsRepository.updateProduct(pid, newProduct);
    if (typeof payload === 'string') {
      const errorMessage = 'Error editing product';
      return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
    }
    return res.status(HTTP_STATUS.OK).json(successResponse({ product: payload }));
  } catch (err) {
    return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
  }
};

export const eraseProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const payload = await productsRepository.deleteProduct(req, res, pid);
    if (typeof payload === 'string') {
      const errorMessage = 'Error deleting product';
      return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
    }
    return res.status(HTTP_STATUS.OK).json(successResponse({ products: payload }));
  } catch (err) {
    return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
  }
};

export const mockingProductsController = async (req, res) => {
  try {
    const payload = await productsRepository.generateProducts(req, res);
    if (typeof payload === 'string') {
      const errorMessage = 'Error mocking products';
      return res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse(errorMessage, payload));
    }
    return res.status(HTTP_STATUS.OK).json(successResponse({ products: payload }));
  } catch (err) {
    return res.status(HTTP_STATUS.SERVER_ERROR).json(errorResponse('Internal server error', err.message));
  }
};

export default {
	getProducts,
	getProduct,
	insertProductController,
	editProductController,
	eraseProductController,
	mockingProductsController,
  };