import { Router } from "express";
import CartManager from "../dao/dbManagers/carts.js";

const router = Router();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  try {
    let carts = await cartManager.getAllCarts();
    return res.status(200).json({ status: "success", payload: carts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
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
});

router.post("/", async (req, res) => {
  try {
    let newCart = await cartManager.createCart();
    return res.status(200).json({ status: "success", payload: newCart });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  
  let updatedCart = await cartManager.addProductToCart(cartId, productId);
  if (!updatedCart) {
    return res
      .status(404)
      .send({ status: "error", error: "Carrito o producto no encontrado" });
  }
  res.send({ status: "success", payload: updatedCart });
});

router.put("/:id/products/:productId/quantity", async (req, res) => {
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
  });
  
  router.delete("/:id/products/:productId", async (req, res) => {
    const cartId = req.params.id;
    const productId = req.params.productId;
    let updatedCart = await cartManager.removeProductFromCart(cartId, productId);
    if (!updatedCart) {
      return res
        .status(404)
        .send({ status: "error", error: "Carrito o producto no encontrado" });
    }
    res.send({ status: "success", payload: updatedCart });
  });
  
  router.delete("/:id", async (req, res) => {
    const cartId = req.params.id;
    let updatedCart = await cartManager.clearCart(cartId);
    if (!updatedCart) {
      return res
        .status(404)
        .send({ status: "error", error: "Carrito no encontrado" });
    }
    res.send({ status: "success", payload: updatedCart });
  });

export default router;
