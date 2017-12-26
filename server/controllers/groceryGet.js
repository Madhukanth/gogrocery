const Grocery = require('../models/grocery');

exports.groceryGet = (req, res, next) => {
	Grocery.find({}, (err, grocery) => {
		if (err) {
			next(err);
		} else {
			res.json(grocery);
		}
	});
};
