import connection from '../connection/db';

export default function authenticate(username, password) {
	return new Promise((resolve, reject) => {

		connection('users')
			.where({
				username,
				password
			})
			.count('* AS count')
			.then((result) => {
				const isAuthenticated = result[0].count === 1;

				if (isAuthenticated) {
					resolve();
				} else {
					reject();
				}
			})
			.catch(() => {
				reject();
			});
	});
}
