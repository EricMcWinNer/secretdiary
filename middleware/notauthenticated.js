const { isObjectId } = require("../utils/validate");

const notauthenticated = (req, res, next) => {
	if (req.session.user) {
		if (isObjectId(req.session.user._id)) res.redirect("/dashboard/");
		else {
			res.flash("login", true);
			res.redirect("/login");
		}
	} else next();
};

module.exports = notauthenticated;
