const Vegetable = require('../models/vegeable');

exports.vegetablesGet = (req, res, next) => {
	Vegetable.find({}, (err, vegetables) => {
		if (err) {
			return next(err);
		}

		if (err) {
			next(err);
		} else {
			res.json(vegetables);
		}
	});
};
