const User = require('../models/user');

exports.signup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const name = req.body.name;
	const address = req.body.address;
	const phonenumber = req.body.phonenumber;

	User.findOne({ email }, (err, existingUser) => {
		if (err) {
			return next(err);
		}

		if (existingUser) {
			console.log(existingUser.password);
			return res.send({ success: 'false' }).status(422);
		}

		const user = new User({
			email,
			password,
			name,
			address,
			phonenumber
		});

		user.save(error => {
			if (error) {
				return next(error);
			}
			res.send({ success: 'true' });
		});
	});
};
