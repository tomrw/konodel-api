import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import { assert, expect } from 'chai';
import generateToken from '../../src/actions/generate-token';

describe('generate-token', () => {
	let sandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should sign a token using the supplied username', () => {
		const spy = sandbox.spy(jwt, 'sign');
		const username = 'tom';

		generateToken(username);

		assert(spy.calledOnce);
		assert(spy.calledWith({
			username
		}));
	});

	it('should return the generated token', () => {
		const username = 'tom';
		const token = generateToken(username);

		expect(token).to.be.a('string');
	});
});
