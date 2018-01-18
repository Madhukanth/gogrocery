const SignupAuth = require('./controllers/signupAuth');
const LoginAuth = require('./controllers/loginAuth');
const VegetablesGet = require('./controllers/vegetablesGet');
const GroceryGet = require('./controllers/groceryGet');
const PersonalCareGet = require('./controllers/personalCareGet');
const Stationery = require('./controllers/stationeryGet');
const ClientToken = require('./braintree/braintree');
const Purchase = require('./braintree/braintree');
const GetAmount = require('./braintree/braintree');

module.exports = app => {
	app.post('/login', LoginAuth.login);
	app.post('/signup', SignupAuth.signup);
	app.get('/vegetables', VegetablesGet.vegetablesGet);
	app.get('/grocery', GroceryGet.groceryGet);
	app.get('/personalCare', PersonalCareGet.personalCareGet);
	app.get('/stationery', Stationery.stationeryGet);
	app.get('/client_token', ClientToken.clientToken);
	app.post('/purchase', Purchase.purchase);
	app.post('/getamount', GetAmount.getAmount);
};
