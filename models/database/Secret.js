const mongoose = require("mongoose");

const SecretSchema = new mongoose.Schema({
	content: { type: String, required: true },
	locked: { type: Boolean, default: false },
	password: { type: String, default: null },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: null,
	},
});

const Secret = mongoose.model("Secret", SecretSchema);

module.exports = Secret;
