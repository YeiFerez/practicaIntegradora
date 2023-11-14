import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";
import ticketModel from "../models/ticket.model.js";
import { getAmount } from "../../utils/recursos.js";
import UserDTO from "../../dto/user.dto.js";
import {sendTicketEmail} from "../../utils/email.utils.js"
import { sendTicketMessage } from "../../utils/message.utils.js";
import logger from "../../utils/logger.util.js";

export class CartManagerDAO{
  constructor() {}

  async getAllCarts() {
    try {
			const carts = await cartModel.find().populate('products._id');
			if (!carts) return `No se encuentran los carts.`;
			return carts;
    } catch (error) {
      console.error("Error al obtener los carritos:", error);
      return `${error}`;
    }
  }

  async getCartById(cid) {
    try {
      const cart = await cartModel.findById(cid).populate('products._id');
      if (!cart) return `Carrito no encontrado con el id '${cid}'.`;
			return cart;
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      return `${error}`;
    }
  }

  async createCart(cart) {
    try {
      const newCart = await cartModel.create(cart);
      if (!newCart) return `No hay carrito creado.`;
			return newCart;
    } catch (error) {
      console.error("Error al crear el carrito:", error);
      return `${error}`;
    }
  }

  async addProductToCart(req, res, cid, pid) {
    try {
		const { user } = req.session;
      const cart = await cartModel.findById(cid);
      if (!cart) return `No hay carro con ID '${cid}'.`;

      const product = await productModel.findById(pid);
		if (!product) return `no hay producto con ID '${pid}'.`;
	
		if (user.email == product.owner) return `no puede añadir producto creado por usted`;

      const productInCart = cart.products.find((item) => item._id.toString() === product.id);

		if (!productInCart) {
			const create = {
				$push: { products: { _id: product.id, quantity: 1 } },
			};
			await cartModel.findByIdAndUpdate({ _id: cid }, create);
      return await cartModel.findById(cid);
		};

		await cartModel.findByIdAndUpdate(
			{ _id: cid },
			{ $inc: { "products.$[elem].quantity": 1 } },
			{ arrayFilters: [{ "elem._id": product.id }] }
		);

		const updatedCart = await cartModel.findById(cid).populate('products._id');
			return updatedCart;
    } catch (error) {
			return `${error}`;
		}
  }

  async updateCart(req, res, cid, newCart) {
		try {
			const { user } = req.session;
			const cart = await cartModel.findById(cid);
			if (!cart) return `No hay carro con ese ID '${cid}'.`;

			for (const product of newCart) {
				const existProduct = await productModel.findById(product._id);

				if(!existProduct) {
					logger.warn(`Producto ${product._id} no existe.`);
					continue;
				};

				if (user.email == existProduct.owner) {
					logger.warn(`no puede añadir producto con ID '${product._id}' , a sido creado por usted`);
					continue;
				};

				if (product.quantity < 1) {
					logger.warn(
						`'${product.quantity}' es un valor invalido, a sido ajustado a '1'`
					);
					product.quantity = 1;
				}


				if (existProduct && existProduct.stock < product.quantity) {
					product.quantity = existProduct.stock;
					logger.warn(`stock insuficiente, el stock fue ajustado al maximo posible: '${existProduct.stock}'`)
				}

				if (existProduct && existProduct.stock >= product.quantity) {
					const productInCart = cart.products.find(
						productInCart => productInCart.id == existProduct.id
					);

					if (!productInCart) {
						const create = {
							$push: {
								products: { _id: existProduct.id, quantity: product.quantity },
							},
						};
						await cartModel.findByIdAndUpdate({ _id: cid }, create);
					}

					await cartModel.findByIdAndUpdate(
						{ _id: cid },
						{ $set: { 'products.$[elem].quantity': product.quantity } },
						{ arrayFilters: [{ 'elem._id': existProduct.id }] }
					);
				}
			}

			const updatedCart = await cartModel.findById(cid).populate('products._id');
			return updatedCart;
		} catch (error) {
			return `${error}`;
		}
	}

  async updateProductQuantity(cid, pid, newQuantity) {
    try {
			const cart = await cartModel.findById(cid);
			if (!cart) return `No hay carro con el ID '${cid}'.`;

			const product = await productModel.findById(pid);
			if (!product) return `no se encontro producto con el ID '${pid}'.`;

			const productInCart = cart.products.find(
				(item) => item._id.toString() === product.id
			);

			if (!productInCart)
				return `No hay producto con ID '${pid}' encontrado en el carro '${cid}'`;

			if (newQuantity > product.stock) {
				newQuantity = product.stock;
				logger.warn(`stock insuficiente, cantidad establecida al maximo: '${product.stock}'`)
			}

			await cartModel.findByIdAndUpdate(
				{ _id: cid },
				{ $set: { 'products.$[elem].quantity': newQuantity } },
				{ arrayFilters: [{ 'elem._id': pid }] }
			);

			const updatedCart = await cartModel.findById(cid).populate('products._id');
			return updatedCart;
		} catch (error) {
			return `${error}`;
		}
	}
	
	async clearCart(cid, newCart) {
		try {
			const cartM = await cartModel.findById(cid);
			if (!cartM) return `No se encontro carro con ID '${cid}'.`;
			await cartModel.findByIdAndUpdate(cid, newCart);

			const updatedCart = await cartModel
				.findById(cid)
				.populate('products._id');
			return updatedCart;
		} catch (error) {
			return `${error}`;
		}
	}

  async removeProductFromCart(cid, pid) {
    try {
		const cartM = await cartModel.findById(cid);
		if (!cartM) return `No se encontro carro con ID '${cid}'.`;

		await cartModel.findByIdAndUpdate(cid, {
			$pull: { products: { _id: pid } },
		});

		const updatedCart = await cartModel.findById(cid).populate('products._id');
		return updatedCart;
	} catch (error) {
		return `${error}`;
	}
  }


  async purchaseCart(req, res) {
		try {
			const { user } = req.session;
			const { cid } = req.params;
			const cart = await cartModel.findById(cid).populate('products._id');
			if (!cart) return `no se encontro carrito con ID '${cid}'.`;
			if (cart.length < 1) return `carrito vacio.`;

			let productsToPurchase = [];
			const products = cart.products;
			for (const product of products) {
				const productId = product._id._id;
				const existProduct = await productModel.findById(productId);
				const productStock = existProduct.stock;
				const productQuantity = product.quantity;

				if (existProduct && productStock < productQuantity) {
					logger.warn(`no hay suficiente stock '${productId}'`)
					continue;
				}

				if (
					existProduct &&
					productStock >= productQuantity &&
					productStock > 0
				) {
					const newStock = productStock - productQuantity;
					await productModel.findByIdAndUpdate(productId, {
						$set: { stock: newStock },
					});

					await cartModel.findByIdAndUpdate(cid, {
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

			await sendTicketEmail(ticket);
			await sendTicketMessage(ticket);
			const createdTicket = await ticketModel.create(ticket);
			if (!createdTicket)
				return `Estos productos no se pueden comprar: ${products}`;
			return createdTicket;
		} catch (error) {
			return `${error}`;
		}
	}

	async createCartForUser(user) {
		try {
		  // Crear un nuevo carrito
		  const newCart = await cartModel.create({ products: [] });
	
		  // Asociar el ID del nuevo carrito al usuario
		  await userModel.findByIdAndUpdate(user._id, { cart: newCart._id });
	
		  return newCart;
		} catch (error) {
		  return `${error}`;
		}
	  }
}



