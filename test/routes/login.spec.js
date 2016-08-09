import { assert } from 'chai';
import { spy } from 'sinon';
import login from '../../src/routes/login';

describe('login', () => {
	it('should return an error if no username is given', () => {
		const request = {
			body: { password: 'test' }
		};
		const response = {
			json: spy()
		};

		login(request, response);

		assert(response.json.calledWith({
			success: false,
			message: 'You must provide a username and password'
		}));
	});

	it('should return an error if no password is given', () => {
		const request = {
			body: { username: 'tom' }
		};
		const response = {
			json: spy()
		};

		login(request, response);

		assert(response.json.calledWith({
			success: false,
			message: 'You must provide a username and password'
		}));
	});
});
