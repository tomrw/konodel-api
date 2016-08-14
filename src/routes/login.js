import authenticate from '../actions/authenticate';
import login from '../actions/login';

export default function (req, res) {
	login(authenticate, req.body)
		.then(() => {
			res.json({
				success: true
			});
		})
		.catch((reason) => {
			res.json({
				success: false,
				message: reason
			});
		});
}
