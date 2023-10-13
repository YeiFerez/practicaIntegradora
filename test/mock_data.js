import { faker } from '@faker-js/faker/locale/es';

export const mock_data = {
	product: {
		title: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		code: faker.string.uuid(),
		price: faker.commerce.price(),
		stock: faker.number.int({ min: 0, max: 100 }),
		category: faker.commerce.product(),
	},
	user: {
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		role: 'user',
	},
	registerUser: {
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
	},
	registerAdmin: {
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		email: 'adminDan@gmail.com',
		password: 'admin1234',
	},
	loginUser: {
		email: 'adminDan@gmail.com',
		password: 'user1234',
	},
	loginAdmin: {
		email: 'adminDan@gmail.com',
		password: 'admin1234',
	},
};
