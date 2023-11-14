import cartModel from "../dao/models/carts.model.js";


export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

export class HttpError {
  constructor(description, status = 500, details = null) {
    this.description = description;
    this.status = status;
    this.details = details;
  }
}

export const successResponse = (payload) => {
  return {
    success: true,
    payload
  }
};

export const errorResponse = (description, error = null) => {
  return {
    success: false,
    description,
    details: error
  }
}

export function getAmount(items) {
	let total = 0;
	for (const item of items) {
		total += item.price * item.quantity;
	}
	return total;
}

export function multiply(a, b) {
	let total = a * b;
	return total;
}

export function getTotal(items) {
	let total = 0;
	for (const item of items) {
		total += item._id.price * item.quantity;
	}
	return total;
}

export async function mongoCart(req, res) {
	
  
	// Intenta obtener la cookie 'cart'
	const cart = req.signedCookies['cart'];
  
	const existCart = await cartModel.findById(cart);
  
	if (existCart) {
	  return existCart;
	} else {
	  // Si no existe la cookie 'cart' o no se encuentra el carrito, crea uno nuevo
	  const createdCart = await cartModel.create({ products: [] });
	  const cartId = createdCart.id;
	  
	  // Establece la cookie 'cart' en la respuesta
	  res.cookie('cart', cartId, { signed: true });
  
	  return createdCart;
	}
  }
  