import { Router } from "express";
import CartManager from "../dao/dbManagers/carts.js";

const router = Router();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  let carts = await cartManager.getAllCarts();
  res.send({ status: "success", payload: carts });
});

router.get("/:id", async (req, res) => {
  const cartId = req.params.id;
  let cart = await cartManager.getCartById(cartId);
  if (!cart) {
    return res
      .status(404)
      .send({ status: "error", error: "Carrito no encontrado" });
  }
  res.send({ status: "success", payload: cart });
});

router.post("/", async (req, res) => {
  let newCart = await cartManager.createCart();
  res.send({ status: "success", payload: newCart });
});

router.post("/:id/products", async (req, res) => {
  const cartId = req.params.id;
  const { productId, quantity } = req.body;
  let updatedCart = await cartManager.addProductToCart(
    cartId,
    productId,
    quantity
  );
  if (!updatedCart) {
    return res
      .status(404)
      .send({ status: "error", error: "Carrito no encontrado" });
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
