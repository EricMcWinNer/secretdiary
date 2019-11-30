const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	username: {
		type: String,
		required: [true, "A username is reqiured"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "An email is required"],
		unique: true,
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
