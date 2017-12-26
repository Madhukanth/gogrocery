const User = require('../models/user');

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }, (err, existingUser) => {
		if (err) {
			return next(err);
		}

		if (existingUser) {
			console.log(existingUser);
			if (existingUser.password === password) {
				console.log(existingUser.password);
				return res.send({ success: 'true' });
			}
			return res.send({ success: 'false' });
		}
		return res.send({ success: 'false' });
	});
};
