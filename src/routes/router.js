import products from './products.router.js'
import carts from './carts.router.js'
import sessions from './sessions.router.js'
import views from './views.router.js'
import tests from './tests.router.js';

const router = (app) => {
	app.use('/api/products', products);
	app.use('/api/carts', carts);
	app.use('/api/sessions', sessions);
	app.use('/api/tests', tests);
	app.use('/', views);
};

export default router;