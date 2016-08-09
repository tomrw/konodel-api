import { MISSING_USERNAME_OR_PASSWORD } from '../constants/errors';

export default function login(req, res) {
	const { username, password } = req.body;

	if (!username || !password) {
		res.json({
			success: false,
			message: MISSING_USERNAME_OR_PASSWORD
		});

		return;
	}

	res.send(`${ username } -- ${ password }`);
}
