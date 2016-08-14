import connection from '../connection/db';

export default function authenticate(username, password) {
	return new Promise((resolve, reject) => {
		connection.connect(() => {
			const query = 'SELECT COUNT(*) AS count FROM users WHERE username = ? AND password = ? LIMIT 1';
			const params = [ username, password ];

			connection.query(query, params, function (err, result) {
				const isAuthenticated = result[0].count === 1;

				if (isAuthenticated) {
					resolve();
				} else {
					reject();
				}
			});
		});
	});
}
