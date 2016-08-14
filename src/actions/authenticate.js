import { defer } from 'es6-promise-extended';
import connection from '../connection/db';
import {
	ERROR_PROCESSING_REQUEST,
	INCORRECT_USERNAME_OR_PASSWORD
} from '../constants/errors';

export default function authenticate(username, password) {
	const deferred = defer();

	connection('users')
		.where({
			username,
			password
		})
		.count('* AS count')
		.then((result) => {
			const isAuthenticated = result[0].count === 1;

			if (isAuthenticated) {
				deferred.resolve();
			} else {
				deferred.reject(INCORRECT_USERNAME_OR_PASSWORD);
			}
		})
		.catch(() => {
			deferred.reject(ERROR_PROCESSING_REQUEST);
		});

	return deferred.promise;
}
