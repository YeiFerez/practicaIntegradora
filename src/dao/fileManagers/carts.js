import fs from 'fs';
import __dirname from '../../utils.js';

const cartsPath = `${__dirname}/files/carts.json`;

export default class CartManager {
  constructor() {
    console.log(`Trabajando en el archivo ${cartsPath}`);
  }

  getAllCarts = async () => {
    try {
      if (fs.existsSync(cartsPath)) {
        const data = await fs.promises.readFile(cartsPath, 'utf8');
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (error) {
      console.log('No se puede leer el archivo:', error);
      return null;
    }
  };

  getCartById = async (cartId) => {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((cart) => cart.id === cartId);
      return cart || null;
    } catch (error) {
      console.log('No se puede obtener el carrito:', error);
      return null;
    }
  };

  createCart = async (userId) => {
    try {
      const carts = await this.getAllCarts();
      const newCart = { id: carts.length + 1, userId, products: [] };
      carts.push(newCart);
      await this.saveCarts(carts);
      return newCart;
    } catch (error) {
      console.log('No se puede crear el carrito:', error);
      return null;
    }
  };

  addProductToCart = async (cartId, productId, quantity) => {
    try {
      const carts = await this.getAllCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);
      if (cartIndex !== -1) {
        const cart = carts[cartIndex];
        const existingProduct = cart.products.find((product) => product.id === productId);
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ id: productId, quantity });
        }
        await this.saveCarts(carts);
        return cart;
      } else {
        console.log('El carrito no existe');
        return null;
      }
    } catch (error) {
      console.log('No se puede agregar el producto al carrito:', error);
      return null;
    }
  };

  removeProductFromCart = async (cartId, productId) => {
    try {
      const carts = await this.getAllCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);
      if (cartIndex !== -1) {
        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex((product) => product.id === productId);
        if (productIndex !== -1) {
          cart.products.splice(productIndex, 1);
          await this.saveCarts(carts);
        }
        return cart;
      } else {
        console.log('El carrito no existe');
        return null;
      }
    } catch (error) {
      console.log('No se puede eliminar el producto del carrito:', error);
      return null;
    }
  };

  saveCarts = async (carts) => {
    try {
      await fs.promises.writeFile(cartsPath, JSON.stringify(carts, null, 2));
      console.log('Datos de carritos guardados correctamente.');
    } catch (error) {
      console.log('No se puede guardar los datos de carritos:', error);
    }
  };
}
