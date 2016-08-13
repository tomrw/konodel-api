import authenticate from '../actions/authenticate';
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

	authenticate(username, password)
		.then(() => {
			res.json({
				success: true
			});
		})
		.catch(() => {
			res.json({
				success: false,
				message: INCORRECT_USERNAME_OR_PASSWORD
			});
		});
}
