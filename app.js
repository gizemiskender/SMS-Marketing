var createError = require('http-errors');
var express = require('express');
var cookieParser = require("cookie-parser");
var sessions = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var marketingRouter = require('./routes/marketing');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "Se938gBc91;!=!fdasAsv8127Zsf",
    saveUninitialized: true,
    cookie: {maxAge: oneDay, secure: false, httpOnly: false},
    resave: true
}));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/marketing', marketingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
