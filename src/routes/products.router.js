import { Router } from 'express';
import ProductsManager from '../dao/dbManagers/products.js';

const productsManager = new ProductsManager();
const router = Router();

router.get('/', async (req, res) => {
  let products = await productsManager.getAllProducts();
  if (!products) {
    return res.status(500).send({ status: 'error', error: 'No se pudieron obtener los datos' });
  }
  res.send({ status: 'success', payload: products });
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  let product = await productsManager.getProductById(productId);
  if (!product) {
    return res.status(404).send({ status: 'error', error: 'Producto no encontrado' });
  }
  res.send({ status: 'success', payload: product });
});

router.post('/', async (req, res) => {
  let { name, description, price, category } = req.body;
  let newProduct = { name, description, price, category };
  let result = await productsManager.addProduct(newProduct);
  res.send({ status: 'success', payload: result });
});

router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  let { name, description, price, category } = req.body;
  let updatedProduct = { name, description, price, category };
  let result = await productsManager.updateProduct(productId, updatedProduct);
  if (!result) {
    return res.status(404).send({ status: 'error', error: 'Producto no encontrado' });
  }
  res.send({ status: 'success', payload: result });
});

router.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  let deletedProduct = await productsManager.deleteProduct(productId);
  if (!deletedProduct) {
    return res.status(404).send({ status: 'error', error: 'Producto no encontrado' });
  }
  res.send({ status: 'success', payload: deletedProduct });
});

export default router;
