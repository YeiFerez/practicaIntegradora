import { successResponse, errorResponse, HTTP_STATUS  } from '../utils/recursos.js';
import { productsService } from '../services/services.js';


export const getProducts = async (req, res) => {
  try {
    const payload = await productsService.getProducts();
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
    const payload = await productsService.getProduct(pid);
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
    const newProduct = req.body;
    const payload = await productsService.createProduct(newProduct);
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
    const payload = await productsService.updateProduct(pid, newProduct);
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
    const payload = await productsService.deleteProduct(pid);
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
    const payload = await productsService.generateProducts(req, res);
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