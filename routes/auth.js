const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	//Decisively send a person to either the dashboard or the registration page.
});

router.get("/login", (req, res) => {
	res.render("auth/login", {
		APP_NAME: process.env.APP_NAME,
	});
});

router.get("/register", (req, res) => {
    res.render("auth/register", {
        APP_NAME: process.env.APP_NAME
    })
})

module.exports = router;
