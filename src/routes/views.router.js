import { Router } from "express";
import ProductsManager from "../dao/dbManagers/products.js";
import CartManager from "../dao/dbManagers/carts.js";

const productsManager = new ProductsManager();
const cartManager = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    let products = await productsManager.getAllProducts();
    console.log(products);
    res.render("products", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/carts", async (req, res) => {
  try {
    let carts = await cartManager.getAllCarts();
    console.log(carts);
    res.render("carts", { carts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});


export default router;
