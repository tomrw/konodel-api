import jwt from 'jsonwebtoken';

export default function generateToken(username) {
	const options = {
		username
	};
	const secret = 'test';
	const token = jwt.sign(options, secret);

	return token;
}
