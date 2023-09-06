import CartManager from "../dao/dbManagers/carts.js";

const cartManager = new CartManager();

const carts = async (req, res) => {
	try {
		let carts = await cartManager.getAllCarts();
		return res.status(200).json({ status: "success", payload: carts });
	  } catch (error) {
		return res.status(500).json({ error: error.message });
	  }
};

const cart = async (req, res) => {
	try {
	  const cartId = req.params.id;
	  let cart = await cartManager.getCartById(cartId);
	  if (!cart) {
		return res.status(404).json({ status: "error", error: "Carrito no encontrado" });
	  }
	  return res.status(200).json({ status: "success", payload: cart });
	} catch (error) {
	  return res.status(500).json({ error: error.message });
	}
  }

const createCart = async (req, res) => {
	try {
	  let newCart = await cartManager.createCart();
	  return res.status(200).json({ status: "success", payload: newCart });
	} catch (error) {
	  return res.status(500).json({ error: error.message });
	}
  }

const addProduct = async (req, res) => {
	const cartId = req.params.cid;
	const productId = req.params.pid;
	
	let updatedCart = await cartManager.addProductToCart(cartId, productId);
	if (!updatedCart) {
	  return res
		.status(404)
		.send({ status: "error", error: "Carrito o producto no encontrado" });
	}
	res.send({ status: "success", payload: updatedCart });
  }


const updateProduct = async (req, res) => {
    const cartId = req.params.id;
    const productId = req.params.productId;
    const { quantity } = req.body;
    let updatedCart = await cartManager.updateProductQuantity(
      cartId,
      productId,
      quantity
    );
    if (!updatedCart) {
      return res
        .status(404)
        .send({ status: "error", error: "Carrito o producto no encontrado" });
    }
    res.send({ status: "success", payload: updatedCart });
  };

const deleteProduct = async (req, res) => {
    const cartId = req.params.id;
    const productId = req.params.productId;
    let updatedCart = await cartManager.removeProductFromCart(cartId, productId);
    if (!updatedCart) {
      return res
        .status(404)
        .send({ status: "error", error: "Carrito o producto no encontrado" });
    }
    res.send({ status: "success", payload: updatedCart });
  };

const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    let updatedCart = await cartManager.clearCart(cartId);
    if (!updatedCart) {
      return res
        .status(404)
        .send({ status: "error", error: "Carrito no encontrado" });
    }
    res.send({ status: "success", payload: updatedCart });
  };

export default {
  carts,
  cart,
  createCart,
  addProduct,
  updateProduct,
  deleteCart,
  deleteProduct,
};