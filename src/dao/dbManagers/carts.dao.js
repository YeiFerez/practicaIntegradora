import CartModel from "../models/carts.model.js";
import ProductModel from "../models/products.model.js";
import ticketModel from "../models/ticket.model.js";
import { getAmount } from "../../utils/recursos.js";
import UserDTO from "../../dto/user.dto.js";

export class CartManagerDAO{
  constructor() {}

  async getAllCarts() {
    try {
			const carts = await CartModel.find().populate('products._id');
			if (!carts) return `No se encuentran los carts.`;
			return carts;
    } catch (error) {
      console.error("Error al obtener los carritos:", error);
      return `${error}`;
    }
  }

  async getCartById(cid) {
    try {
      const cart = await CartModel.findById(cid).populate('products._id');
      if (!cart) return `Carrito no encontrado con el id '${cid}'.`;
			return cart;
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      return `${error}`;
    }
  }

  async createCart(cart) {
    try {
      const newCart = await CartModel.create(cart);
      if (!newCart) return `No hay carrito creado.`;
			return newCart;
    } catch (error) {
      console.error("Error al crear el carrito:", error);
      return `${error}`;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) return `No hay carro con ID '${cid}'.`;

      const product = await ProductModel.findById(pid);
			if (!product) return `no hay producto con ID '${pid}'.`;

      
      const productInCart = cart.products.find((item) => item._id.toString() === product.id);

		if (!productInCart) {
			const create = {
				$push: { products: { _id: product.id, quantity: 1 } },
			};
			await CartModel.findByIdAndUpdate({ _id: cid }, create);
      return await CartModel.findById(cid);
		};

		await CartModel.findByIdAndUpdate(
			{ _id: cid },
			{ $inc: { "products.$[elem].quantity": 1 } },
			{ arrayFilters: [{ "elem._id": product.id }] }
		);

		const updatedCart = await CartModel.findById(cid).populate('products._id');
			return updatedCart;
    } catch (error) {
			return `${error}`;
		}
  }

  async updateCart(cid, newCart) {
		try {
			const cart = await CartModel.findById(cid);
			if (!cart) return `No hay carro con ese ID '${cid}'.`;

			for (const product of newCart) {
				if (product.quantity < 1) {
					console.log(
						`'${product.quantity}' es un valor invalido, a sido ajustado a '1'`
					);
					product.quantity = 1;
				}

				const existProduct = await ProductModel.findById(product._id);

				if (existProduct && existProduct.stock < product.quantity) {
					product.quantity = existProduct.stock;
					console.log(`stock insuficiente, el stock fue ajustado al maximo posible: '${existProduct.stock}'`)
				}

				if (existProduct && existProduct.stock >= product.quantity) {
					const productInCart = cart.products.find(
						(productInCart) => productInCart.id == existProduct.id
					);

					if (!productInCart) {
						const create = {
							$push: {
								products: { _id: existProduct.id, quantity: product.quantity },
							},
						};
						await CartModel.findByIdAndUpdate({ _id: cid }, create);
					}

					await CartModel.findByIdAndUpdate(
						{ _id: cid },
						{ $set: { 'products.$[elem].quantity': product.quantity } },
						{ arrayFilters: [{ 'elem._id': existProduct.id }] }
					);
				}
			}

			const updatedCart = await CartModel.findById(cid).populate('products._id');
			return updatedCart;
		} catch (error) {
			return `${error}`;
		}
	}

  async updateProductQuantity(cid, pid, newQuantity) {
    try {
			const cart = await CartModel.findById(cid);
			if (!cart) return `No hay carro con el ID '${cid}'.`;

			const product = await ProductModel.findById(pid);
			if (!product) return `no se encontro producto con el ID '${pid}'.`;

			const productInCart = cart.products.find(
				(item) => item._id.toString() === product.id
			);

			if (!productInCart)
				return `No product with ID '${pid}' was found in cart '${cid}'`;

			if (newQuantity > product.stock) {
				newQuantity = product.stock;
				console.log(`Insuficient stock, new quantity setted on max stock: '${product.stock}'`)
			}

			await CartModel.findByIdAndUpdate(
				{ _id: cid },
				{ $set: { 'products.$[elem].quantity': newQuantity } },
				{ arrayFilters: [{ 'elem._id': pid }] }
			);

			const updatedCart = await CartModel.findById(cid).populate('products._id');
			return updatedCart;
		} catch (error) {
			return `${error}`;
		}
	}

  async removeProductFromCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (cart) {
        const productIndex = cart.products.findIndex((product) => product.pid.toString() === pid);
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

  async clearCart(cid) {
    try {
      const cart = await CartModel.findById(cid);
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

  async purchaseCart(req, res) {
		try {
			const { user } = req.session;
			const { cid } = req.params;
			const cart = await CartModel.findById(cid).populate('products._id');
			if (!cart) return `no se encontro carrito con ID '${cid}'.`;
			if (cart.length < 1) return `carrito vacio.`;

			let productsToPurchase = [];
			const products = cart.products;
			for (const product of products) {
				const productId = product._id._id;
				const existProduct = await ProductModel.findById(productId);
				const productStock = existProduct.stock;
				const productQuantity = product.quantity;

				if (existProduct && productStock < productQuantity) {
					console.log(`no hay suficiente stock '${productId}'`)
					continue;
				}

				if (
					existProduct &&
					productStock >= productQuantity &&
					productStock > 0
				) {
					const newStock = productStock - productQuantity;
					await ProductModel.findByIdAndUpdate(productId, {
						$set: { stock: newStock },
					});

					await CartModel.findByIdAndUpdate(cid, {
						$pull: { products: { _id: productId } },
					});

					const productToPurchase = {
						...existProduct._doc,
						quantity: productQuantity,
					};
					productsToPurchase.push(productToPurchase);
				}
			}

			if (productsToPurchase.length < 1) return `carrito vacio`;

			const actualDate = new Date();
			const formatedDate = JSON.stringify(actualDate).replace(/['"]+/g, '');
			const code = `ticket_${formatedDate}`;
			const amount = getAmount(productsToPurchase);
			const purchaser = new UserDTO(user);
			const ticket = {
				code,
				purchase_datetime: formatedDate,
				purchase_products: productsToPurchase,
				amount,
				purchaser,
			};

			await sendEmail(ticket);
			const createdTicket = await ticketModel.create(ticket);
			if (!createdTicket)
				return `Estos productos no se pueden comprar: ${products}`;
			return createdTicket;
		} catch (error) {
			return `${error}`;
		}
	}
}

