require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const expressEdge = require("express-edge");
const sass = require("node-sass-middleware");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

var app = express();
mongoose.connect(process.env.MONGODB_CONNECT, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// view engine setup
app.use(expressEdge.engine);
app.use(
	sass({
		/* Options */
		src: path.join(__dirname, "public", "stylesheets"),
		dest: path.join(__dirname, "public", "stylesheets"),
		debug: true,
		outputStyle: "compressed",
		prefix: "/stylesheets", // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
	})
);
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
