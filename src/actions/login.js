import { defer } from 'es6-promise-extended';
import { MISSING_USERNAME_OR_PASSWORD } from '../constants/errors';

export default function login(authenticate, params) {
	const deferred = defer();
	const { username, password } = params;

	if (!username || !password) {
		deferred.reject(MISSING_USERNAME_OR_PASSWORD);
	} else {
		authenticate(username, password)
			.then(() => {
				deferred.resolve();
			})
			.catch((reason) => {
				deferred.reject(reason);
			});
	}

	return deferred.promise;
}
