const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	//Decisively send a person to either the dashboard or the registration page.
});

router.get("/login", (req, res) => {
	const error = req.flash("error");
	const success = req.flash("success");
	
	res.render("auth/login", {
		APP_NAME: process.env.APP_NAME,
		success: success.length ? success[0] : undefined,
		errors: error.length ? error[0] : undefined,
	});
});

router.get("/register", (req, res) => {
	const error = req.flash("error");
	res.render("auth/register", {
		APP_NAME: process.env.APP_NAME,
		errors: error.length ? error : undefined,
		values: req.flash("values")[0],
	});
});

module.exports = router;
