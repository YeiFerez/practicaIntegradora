import CartModel from "../models/carts.model.js";
import ProductModel from "../models/products.model.js";

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

  async addProductToCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      const newProduct = await ProductModel.findById(productId);

      
		const productInCart = cart.products.find(product => product._id.toString() === newProduct.id);

		if (!productInCart) {
			const create = {
				$push: { products: { _id: newProduct.id, quantity: 1 } },
			};
			await CartModel.findByIdAndUpdate({ _id: cid }, create);

			const result = await CartModel.findById(cid);
			return res.status(200).json({ status: "success", payload: result });
		};

		await CartModel.findByIdAndUpdate(
			{ _id: cid },
			{ $inc: { "products.$[elem].quantity": 1 } },
			{ arrayFilters: [{ "elem._id": newProduct.id }] }
		);

		const result = await CartModel.findById(cid);
		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
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
