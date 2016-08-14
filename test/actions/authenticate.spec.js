import { expect } from 'chai';
import mockDb from 'mock-knex';
import authenticate from '../../src/actions/authenticate';
import connection from '../../src/connection/db';

describe('authenticate', () => {
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

	it('should pass the supplied username and password through to the database', (done) => {
		const username = 'tom';
		const password = 'password';

		tracker.on('query', (query) => {
			expect(query.method).to.equal('select');
			expect(query.bindings).to.eql([ username, password ]);

			done();
		});

		authenticate(username, password);
	});

	it('should authenticate a user who provides a valid username and password', (done) => {
		tracker.on('query', (query) => {
			query.response([
				{
					count: 1
				}
			]);
		});

		authenticate('tom', 'password').then(done);
	});

	it('should NOT authenticate a user who does NOT provide a valid username and password', (done) => {
		tracker.on('query', (query) => {
			query.response([
				{
					count: 0
				}
			]);
		});

		authenticate('tom', 'password').catch(done);
	});
});
