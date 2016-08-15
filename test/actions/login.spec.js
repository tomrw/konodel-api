import sinon from 'sinon';
import { expect } from 'chai';
import login from '../../src/actions/login';

describe('login', () => {
	it('should return an error if no username is given', (done) => {
		const authenticate = sinon.stub();
		const params = {
			password: 'password'
		};

		login(authenticate, params).catch((message) => {
			expect(message).to.equal('You must provide a username and password');

			done();
		});
	});

	it('should return an error if no password is given', (done) => {
		const authenticate = sinon.stub();
		const params = {
			username: 'tom'
		};

		login(authenticate, params).catch((message) => {
			expect(message).to.equal('You must provide a username and password');

			done();
		});
	});

	it('should authenticate a user using the supplied username and password', (done) => {
		const authenticate = () => {
			return new Promise((resolve) => {
				resolve();
			});
		};
		const params = {
			username: 'tom',
			password: 'password'
		};

		login(authenticate, params).then(() => {
			done();
		});
	});

	it('should NOT authenticate a user using the supplied username and password if there is an error authenticating', (done) => {
		const authenticate = () => {
			return new Promise((resolve, reject) => {
				reject('generic error message');
			});
		};
		const params = {
			username: 'tom',
			password: 'password'
		};

		login(authenticate, params).catch((message) => {
			expect(message).to.equal('generic error message');

			done();
		});
	});
});
