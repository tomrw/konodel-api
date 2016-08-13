import connection from '../connection/db';
import {
	MISSING_USERNAME_OR_PASSWORD,
	INCORRECT_USERNAME_OR_PASSWORD
} from '../constants/errors';

export default function login(req, res) {
	const { username, password } = req.body;

	if (!username || !password) {
		res.json({
			success: false,
			message: MISSING_USERNAME_OR_PASSWORD
		});

		return;
	}

	connection.connect(() => {
		const query = 'SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1';
		const params = [ username, password ];

		connection.query(query, params, function (err, result) {
			if (result.length === 1) {
				res.json({
					success: true
				});
			} else {
				res.json({
					success: false,
					message: INCORRECT_USERNAME_OR_PASSWORD
				});
			}
		});
	});
}
