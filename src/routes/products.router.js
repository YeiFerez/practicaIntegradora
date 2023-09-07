import { Router } from 'express';
import productsController from '../controllers/products.controller.js';


const router = Router();

router.get('/', productsController.getProduct);

router.get('/:pid', productsController.getProducts);

router.post('/', roleAuth('admin'), productsController.insertProductController);

router.put('/:pid', roleAuth('admin'), productsController.editProductController);

router.delete('/:pid', roleAuth('admin'), productsController.eraseProductController);

router.post('/mockingproducts', roleAuth('admin'), productsController.mockingProductsController);

export default router;
