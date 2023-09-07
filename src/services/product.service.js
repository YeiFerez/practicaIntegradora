import { HTTP_STATUS, HttpError  } from "../utils/recursos.js";
import ProductDTO from "../dto/product.dto.js";

class ProductsService {
	constructor(dao) {
		this.dao = dao;
	}

	async getProducts() {
		try {
			return await this.dao.getAllProducts();
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async getProduct(pid) {
		try {
			return await this.dao.getProductById(pid);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async createProduct(newProduct) {
		try {
			const { title, description, code, price, stock, category } = newProduct;
			if (!title || !description || !code || !price || !stock || !category || !price) {
				return new HttpError("completar todos los campos para crear el producto", HTTP_STATUS.BAD_REQUEST);
			}
			const product = new ProductDTO(newProduct);
			return await this.dao.addProduct(product);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async updateProduct(pid, newProduct) {
		try {
			const { title, description, code, price, stock, category } = newProduct;
			if (!title || !description || !code || !price || !stock || !category || !price) {
				return new HttpError("completar todos los campos para crear el producto", HTTP_STATUS.BAD_REQUEST);
			}
			const product = new ProductDTO(newProduct);
			return await this.dao.updateProduct(pid, product);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async deleteProduct(pid) {
		try {
			return await this.dao.deleteProduct(pid);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async generateProducts() {
		try {
			return await this.dao.generateProducts();
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}
}

export default ProductsService;
