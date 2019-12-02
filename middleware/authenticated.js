const { isObjectId } = require("../utils/validate");

const authenticated = (req, res, next) => {
	if (req.session.user) {
		if (isObjectId(req.session.user._id)) next();
		else res.redirect("/login");
	} else res.redirect("/auth/login");
};

module.exports = authenticated;
