import chai from 'chai';
import supertest from 'supertest';
import { mock_data } from './mock_data.js';

const requester = supertest('http://localhost:8080/api/sessions');
const expect = chai.expect;

describe('Testing Sessions module', () => {
	it('registro como usuario', async () => {
		const { statusCode } = await requester.post('/register').send(mock_data.registerUser);
		expect(statusCode).to.equal(200);
	});

	it('Registro como admin', async () => {
		const { statusCode } = await requester.post('/register').send(mock_data.registerAdmin);
		expect(statusCode).to.equal(404);
	});

	it('Logeo como usuario', async () => {
		const { statusCode } = await requester.post('/login').send(mock_data.loginUser);
		expect(statusCode).to.equal(200);
	});

	it('Logeo como admin', async () => {
		const { statusCode } = await requester.post('/login').send(mock_data.loginAdmin);
		expect(statusCode).to.equal(200);
	});
});