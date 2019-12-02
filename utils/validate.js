const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function isObjectId(id) {
	let string = id.toString().toLowerCase();

	if (ObjectId.isValid(string)) {
		let stringId = new ObjectId(string);
		return stringId.toString() === string;
	} else return false;
}

module.exports.validateEmail = validateEmail;
module.exports.isObjectId = isObjectId;
