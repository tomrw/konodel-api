import authenticate from '../actions/authenticate';
import login from '../actions/login';

export default function (req, res) {
	login(authenticate, req.body)
		.then((token) => {
			res.json({
				success: true,
				token
			});
		})
		.catch((reason) => {
			res.json({
				success: false,
				message: reason
			});
		});
}
