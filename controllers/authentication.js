const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/database/User");
const router = express.Router();
const sanitize = require("mongo-sanitize");
const { validateEmail, isObjectId } = require("../utils/validate");

router.post("/login", (req, res) => {
	if (req.session.user) {
		if (isObjectId(req.session.user._id)) res.redirect("/dashboard");
		else {
			req.flash("login", true);
			res.redirect("/logout");
		}
	} else {
		let { usermail, password } = req.body;
		usermail = sanitize(usermail);
		User.findOne(
			{ $or: [{ email: usermail }, { username: usermail }] },
			(err, user) => {
				if (err) {
					console.log(err);
				} else {
					if (user) {
						bcrypt.compare(password, user.password).then(r => {
							if (r === true) {
								delete user.password;
								req.session.user = user;
								res.redirect("../dashboard");
							} else {
								req.flash(
									"error",
									"The username, email or password you submitted is incorrect"
								);
								res.redirect("/auth/login");
							}
						});
					} else {
						req.flash(
							"error",
							"The username, email or password you submitted is incorrect"
						);
						res.redirect("/auth/login");
					}
				}
			}
		);
	}
});

router.post("/register", (req, res) => {
	let mssg;
	const { username, email, password, confirmPassword } = req.body;
	if (password === confirmPassword) {
		if (password.length < 6) {
			req.flash("error", "Password should be at least 6 characters long");
			req.flash("values", { username, email });
			return res.redirect("/auth/register");
		}
		if (validateEmail(email)) {
			bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (err, salt) => {
				bcrypt.hash(password, salt, (err, hash) => {
					User.create(
						{
							username,
							email,
							password: hash,
						},
						(err, user) => {
							if (err && err.code === 11000) {
								if (err.errmsg.includes("username"))
									mssg = `The username "${username}" has already been registered`;
								else if (err.errmsg.includes("email"))
									mssg = `The email "${email}" has already been registered`;
								else mssg = err.errmsg;
								req.flash("error", mssg);
								req.flash("values", { username, email });
								res.redirect("/auth/register");
							} else {
								req.flash("success", "Account created successfully.");
								res.redirect("/auth/login");
							}
						}
					);
				});
			});
		} else {
			req.flash("error", `The email "${email}" you submitted is invalid.`);
			req.flash("values", { username, email });
			res.redirect("/auth/register");
		}
	} else {
		req.flash("error", "The passwords you entered do not match");
		req.flash("values", { username, email });
		res.redirect("/auth/register");
	}
});

router.get("/logout", (req, res) => {
	req.session.user = undefined;
	const login = req.flash("login");
	req.flash("message", "You have logged out successfully");
	res.redirect(login.length ? "/auth/login" : "/");
});

module.exports = router;
