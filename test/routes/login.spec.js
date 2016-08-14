import { assert } from 'chai';
import mockDb from 'mock-knex';
import sinon from 'sinon';
import connection from '../../src/connection/db';
import login from '../../src/routes/login';

describe('routes/login', () => {
	let tracker;

	beforeEach(() => {
		mockDb.mock(connection);

		tracker = mockDb.getTracker();
		tracker.install();
	});

	afterEach(() => {
		mockDb.unmock(connection);

		tracker.uninstall();
	});

	it('should respond with an error message if the user provides invalid details', (done) => {
		const request = {
			body: {
				username: 'tom'
			}
		};
		const response = {
			json: sinon.spy()
		};

		login(request, response);

		process.nextTick(() => {
			assert(response.json.calledWith({
				success: false,
				message: 'You must provide a username and password'
			}));

			done();
		});
	});

	it('should respond with a success message if the user is successfully authenticated', (done) => {
		const request = {
			body: {
				username: 'tom',
				password: 'password'
			}
		};
		const response = {
			json: sinon.spy()
		};

		tracker.on('query', (query) => {
			query.response([
				{
					count: 1
				}
			]);
		});

		login(request, response);

		setTimeout(() => {
			assert(response.json.calledWith({
				success: true
			}));

			done();
		}, 10);
	});
});
