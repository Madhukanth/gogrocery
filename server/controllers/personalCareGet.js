const PersonalCare = require('../models/personalCare');

exports.personalCareGet = (req, res, next) => {
	PersonalCare.find({}, (err, personalCare) => {
		if (err) {
			return next(err);
		}

		if (err) {
			next(err);
		} else {
			res.json(personalCare);
		}
	});
};
