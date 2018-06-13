const createError = require('http-errors');
const express = require('express');
var fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const clicksRouter = require('./routes/clicks');
const copysRouter = require('./routes/copys');
const recordsRouter = require('./routes/records');

const app = express();

// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// setup the logger
// app.use(logger('combined', {stream: accessLogStream}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/dist',express.static(path.join(__dirname, 'dist')));
app.use('/build',express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/records', recordsRouter);
app.use('/copys', copysRouter);
app.use('/clicks', clicksRouter);

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

module.exports = app;
