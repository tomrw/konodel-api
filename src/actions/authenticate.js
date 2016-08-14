import { defer } from 'es6-promise-extended';
import connection from '../connection/db';

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
				deferred.reject();
			}
		})
		.catch(() => {
			deferred.reject();
		});

	return deferred.promise;
}
