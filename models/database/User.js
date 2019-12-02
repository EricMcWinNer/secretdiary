const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "A username is reqiured"],
		unique: [true, "This username is already registered"],
	},
	email: {
		type: String,
		required: [true, "An email is required"],
		unique: [true, "This email is already registered"],
	},
	password: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	secrets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Secret" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
