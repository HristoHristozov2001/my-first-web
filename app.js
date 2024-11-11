var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session');
var passport = require('./config/passport');
require('dotenv').config();
var flash = require('connect-flash');

// Import additional routes

var peopleRouter = require('./routes/people');
var computersRouter = require('./routes/computers');
var booksRouter = require('./routes/books');
var LogInRouter = require('./routes/logInForm');
var twoFaRouter = require('./routes/2fa'); 

const { connectDB } = require('./config/dbConnection');
const { syncDB } = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false, httpOnly: true, maxAge: 3600000}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);


// Register additional routes

app.use('/people', peopleRouter);
app.use('/computers', computersRouter);
app.use('/books', booksRouter);
app.use('/logIn', LogInRouter);
app.use('/2fa', twoFaRouter);


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

// Database connection and synchronization
(async () => {
  try {
    await connectDB();
    await syncDB();
  } catch (error) {
    console.error('Failed to connect to the database or sync:', error);
  }
})();

module.exports = app;
