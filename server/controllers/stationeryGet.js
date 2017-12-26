const Stationery = require('../models/stationery');

exports.stationeryGet = (req, res, next) => {
	Stationery.find({}, (err, vegetables) => {
		if (err) {
			next(err);
		} else {
			res.json(vegetables);
		}
	});
};
