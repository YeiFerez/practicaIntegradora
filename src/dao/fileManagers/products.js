import fs from 'fs';
import __dirname from '../../utils.js';

const filePath = `${__dirname}/files/products.json`;

export default class ProductsManager {
  constructor() {
    console.log(`Trabajando en el archivo ${filePath}`);
  }

  getAllProducts = async () => {
    try {
      if (fs.existsSync(filePath)) {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (error) {
      console.log('No se puede leer el archivo:', error);
      return null;
    }
  };

  getProductById = async (id) => {
    try {
      const products = await this.getAllProducts();
      return products.find((product) => product.id === id);
    } catch (error) {
      console.log('No se puede obtener el producto:', error);
      return null;
    }
  };

  addProduct = async (product) => {
    try {
      let products = await this.getAllProducts();
      const newProduct = { ...product, id: products.length + 1 };
      products.push(newProduct);
      await fs.promises.writeFile(filePath, JSON.stringify(products, null, '\t'));
      return newProduct;
    } catch (error) {
      console.log('No se puede guardar el archivo:', error);
      return null;
    }
  };

  updateProduct = async (id, updatedProduct) => {
    try {
      let products = await this.getAllProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        await fs.promises.writeFile(filePath, JSON.stringify(products, null, '\t'));
        return products[index];
      }
      return null;
    } catch (error) {
      console.log('No se puede actualizar el archivo:', error);
      return null;
    }
  };

  deleteProduct = async (id) => {
    try {
      let products = await this.getAllProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        await fs.promises.writeFile(filePath, JSON.stringify(products, null, '\t'));
        return deletedProduct[0];
      }
      return null;
    } catch (error) {
      console.log('No se puede eliminar el archivo:', error);
      return null;
    }
  };
}
