import productModel from "../models/products.model.js";
import ProductDTO from "../../dto/product.dto.js";
import { faker } from '@faker-js/faker/locale/es';


export  class ProductsManagerDAO {
  constructor() {
    
  }

  async getAllProducts() {
    try {
      const products = await productModel.find();
      if(!products) return `no encontro productos.`
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return `${error}`;
    }
  }

  async getProductById(pid) {
    try {
      const product = await productModel.findById(pid);
      if(!product) return `producto no encontrado con ID '${pid}'.`
      return product;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return `${error}`;
    }
  }

  async addProduct(product) {
    try {
      const newProduct = await productModel.create(product);
      if(!newProduct) return `No se creó ningún producto.`
      return newProduct;
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      return `${error}`;
    }
  }

  async updateProduct(pid, product) {
    try {
			const productToModify = await productModel.findById(pid);
			if(!productToModify) return `no se encontro producto con ID '${pid}'.`
			await productModel.updateOne({ _id: pid }, product);
			const updatedProduct = await productModel.findById(pid);
			return updatedProduct;
		} catch (error) {
			return `${error}`;
		}
	}

  async deleteProduct(req, res, pid) {
    try {
			const { user } = req.session;
			const product = await productModel.findById(pid);
			if (!product) return `Producto no encontrado con ID '${pid}'.`;
			console.log("user.role", user.role)
			console.log("user.email", user.email)
			console.log("product.owner", product.owner)

			if(user.role == 'premium' && user.email != product.owner) return `no se puede borrar un producto de otro owner.`;

			await productModel.deleteOne({ _id: pid });
			const productDeleted = await productModel.findById(pid);

			if (productDeleted) return `No se elimino producto.`;
			const products = await productModel.find();
			return products;
		} catch (error) {
			return `${error}`;
		}
	}

  async generateProducts(req, res) {
		try {
			const { user } = req.session;
			for (let i = 0; i < 100; i++) {
				const product = {
					title: faker.commerce.productName(),
					description: faker.commerce.productDescription(),
					code: faker.string.uuid(),
					price: faker.commerce.price(),
					stock: faker.number.int({ min: 0, max: 100 }),
					category: faker.commerce.product(),
					owner: user.email,
				};
				const newProduct = new ProductDTO(product);
				await productModel.create(newProduct);
			}

			const products = await productModel.find();
			if (!products) return `No se creo producto.`;
			return products;
		} catch (error) {
			return `${error}`;
		}
	}
  
}
