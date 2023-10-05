import { HTTP_STATUS, HttpError  } from "../utils/recursos.js";
import ProductDTO from "../dto/product.dto.js";

class ProductsRepository {
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
			const { name, description, code, price, stock, category } = newProduct;
			if (!name || !description || !code || !price || !stock || !category || !price) {
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
			const { name, description, code, price, stock, category } = newProduct;
			if (!name || !description || !code || !price || !stock || !category || !price) {
				return new HttpError("completar todos los campos para crear el producto", HTTP_STATUS.BAD_REQUEST);
			}
			const product = new ProductDTO(newProduct);
			return await this.dao.updateProduct(pid, product);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async deleteProduct(req, res, pid) {
		try {
			return await this.dao.deleteProduct(req, res, pid);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}

	async generateProducts(req, res) {
		try {
			return await this.dao.generateProducts(req, res);
		} catch (error) {
			return new HttpError(error.message, HTTP_STATUS.SERVER_ERROR);
		}
	}
}

export default ProductsRepository;
