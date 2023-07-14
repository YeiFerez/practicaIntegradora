import CartModel from "../models/carts.js";

export default class CartManager {
  constructor() {
    console.log("Estamos trabajando con la base de datos de MongoDB");
  }

  async getAllCarts() {
    try {
      const carts = await CartModel.find().lean();
      return carts;
    } catch (error) {
      console.error("Error al obtener los carritos:", error);
      return [];
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id).lean();
      return cart;
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      return null;
    }
  }

  async createCart() {
    try {
      const newCart = await CartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      console.error("Error al crear el carrito:", error);
      return null;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await CartModel.findById(cartId);
      if (cart) {
        const existingProduct = cart.products.find((product) => product.productId.toString() === productId);
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ productId, quantity });
        }
        await cart.save();
        return cart;
      }
      return null;
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      return null;
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await CartModel.findById(cartId);
      if (cart) {
        const existingProduct = cart.products.find((product) => product.productId.toString() === productId);
        if (existingProduct) {
          existingProduct.quantity = quantity;
          await cart.save();
          return cart;
        }
      }
      return null;
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto en el carrito:", error);
      return null;
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (cart) {
        const productIndex = cart.products.findIndex((product) => product.productId.toString() === productId);
        if (productIndex !== -1) {
          cart.products.splice(productIndex, 1);
          await cart.save();
          return cart;
        }
      }
      return null;
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
      return null;
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (cart) {
        cart.products = [];
        await cart.save();
        return cart;
      }
      return null;
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
      return null;
    }
  }
}
