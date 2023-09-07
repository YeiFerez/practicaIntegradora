import products from './products.router.js'
import carts from './carts.router.js'
import sessions from './sessions.router.js'
import views from './views.router.js'

const router = (app) => {
	app.use('/api/products', products);
	app.use('/api/carts', carts);
	app.use('/api/sessions', sessions);
	app.use('/', views);
};

export default router;