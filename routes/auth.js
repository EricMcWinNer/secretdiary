const express = require("express");
const router = express.Router();

router.get(["/", "/login"], (req, res, next) => {
	res.render("login", {
        APP_NAME: process.env.APP_NAME
    });
});

module.exports = router;
