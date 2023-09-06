import ProductsManager from '../dao/dbManagers/products.js';

const productsManager = new ProductsManager();

const products = async (req, res) => {
	try {
	  let products = await productsManager.getAllProducts();
	  if (!products) {
		return res.status(500).send({ status: 'error', error: 'No se pudieron obtener los datos' });
	  }
	  res.send({ status: 'success', payload: products });
	} catch (error) {
	  console.error('Error en la ruta GET /:', error);
	  res.status(500).send({ status: 'error', error: 'Ocurrió un error en el servidor' });
	}
  };

const product = async (req, res) => {
	try {
	  const productId = req.params.id;
	  let product = await productsManager.getProductById(productId);
	  if (!product) {
		return res.status(404).send({ status: 'error', error: 'Producto no encontrado' });
	  }
	  res.send({ status: 'success', payload: product });
	} catch (error) {
	  console.error('Error en la ruta GET /:id:', error);
	  res.status(500).send({ status: 'error', error: 'Ocurrió un error en el servidor' });
	}
  };

const createProduct = async (req, res) => {
	try {
	  const { name, description, price, category } = req.body;
	  if (!name || !description || !price || !category) {
		return res.status(400).send('Complete los campos requeridos');
	  }
	  let newProduct = { name, description, price, category };
	  let result = await productsManager.addProduct(newProduct);
	  res.send({ status: 'success', payload: result });
	} catch (error) {
	  console.error('Error en la ruta POST /:', error);
	  res.status(500).send({ status: 'error', error: 'Ocurrió un error en el servidor' });
	}
  };

const updateProduct = async (req, res) => {
	try {
	  const productId = req.params.id;
	  let { name, description, price, category } = req.body;
	  let updatedProduct = { name, description, price, category };
	  let result = await productsManager.updateProduct(productId, updatedProduct);
	  if (!result) {
		return res.status(404).send({ status: 'error', error: 'Producto no encontrado' });
	  }
	  res.send({ status: 'success', payload: result });
	} catch (error) {
	  console.error('Error en la ruta PUT /:id:', error);
	  res.status(500).send({ status: 'error', error: 'Ocurrió un error en el servidor' });
	}
  };

const deleteProduct = async (req, res) => {
	try {
	  const productId = req.params.id;
	  let deletedProduct = await productsManager.deleteProduct(productId);
	  if (!deletedProduct) {
		return res.status(404).send({ status: 'error', error: 'Producto no encontrado' });
	  }
	  res.send({ status: 'success', payload: deletedProduct });
	} catch (error) {
	  console.error('Error en la ruta DELETE /:id:', error);
	  res.status(500).send({ status: 'error', error: 'Ocurrió un error en el servidor' });
	}
  };

export default {
	products,
	product,
	createProduct,
	updateProduct,
	deleteProduct,
};