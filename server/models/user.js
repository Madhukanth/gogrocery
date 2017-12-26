const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define Model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String,
	name: String,
	address: String,
	phonenumber: String
});

//Create Model
const ModelClass = mongoose.model('user', userSchema);

//Export Model
module.exports = ModelClass;
