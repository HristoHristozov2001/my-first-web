var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Import additional routes
var exampleRouter = require('./routes/example');
var cookieRouter = require('./routes/cookieExample'); 
var dataRouter = require('./routes/data');
var formRouter = require('./routes/form');
var peopleRouter = require('./routes/people');
var computersRouter = require('./routes/computers');
var animalsRouter = require('./routes/animals');
var gamesRouter = require('./routes/games');
var carRouter = require('./routes/cars');
var booksRouter = require('./routes/books');

const { connectDB } = require('./config/database');
const { syncDB } = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/example', exampleRouter);
app.use('/cookie', cookieRouter);
app.use('/data', dataRouter);
app.use('/form', formRouter);
app.use('/people', peopleRouter);
app.use('/computers', computersRouter);
app.use('/animals', animalsRouter);
app.use('/games', gamesRouter);
app.use('/cars', carRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

(async () => {
  try {
    await connectDB(); 
    await syncDB();    
  } catch (error) {
    console.error('Failed to connect to the database or sync:', error);
  }
})();

module.exports = app;
