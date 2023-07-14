import productModel from "../models/products.js";

export default class ProductsManager {
  constructor() {
    console.log("Estamos trabajando con la base de datos de MongoDB");
  }

  async getAllProducts() {
    try {
      const products = await productModel.find().lean();
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id).lean();
      return product;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      return null;
    }
  }

  async addProduct(product) {
    try {
      const newProduct = await productModel.create(product);
      return newProduct;
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      return null;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const product = await productModel.findByIdAndUpdate(
        id,
        updatedProduct,
        { new: true }
      );
      return product;
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await productModel.findByIdAndRemove(id);
      return deletedProduct;
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return null;
    }
  }
}
