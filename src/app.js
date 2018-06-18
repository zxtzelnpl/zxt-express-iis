const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const logs = require('./common/logs');
const errorLogfile = require('./common/files').errorLogfile;


const indexRouter = require('./routes/index');
const clicksRouter = require('./routes/clicks');
const copysRouter = require('./routes/copys');
const recordsRouter = require('./routes/records');
const adminRouter = require('./routes/admin');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql =require('./config/mysql');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

logs(app);

// 验证
// if(app.get('env')==='development'){
//   app.use((req,res,next)=>{
//     let host = req.get('host');
//
//     if(host.indexOf('localhost')>-1){
//
//       console.log(app.get('env'))
//       console.log(host)
//
//       next()
//     }
//     else{
//       res.send('error');
//     }
//
//   })
// }


const sessionStore = new MySQLStore({},mysql.pool)
const sess = {
  secret: 'keyboard cat',
  resave:false,
  saveUninitialized:false,
  store:sessionStore,
  cookie: {
    path: '/admin',
    maxAge:86400000
  }
}
// if (app.get('env') === 'production') {
//
// }

// app.set('trust proxy', 1) // trust first proxy
// sess.cookie.secure = true // serve secure cookies

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session(sess));
app.use(cookieParser('keyboard cat'));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/', indexRouter);
app.use('/records', recordsRouter);
app.use('/copys', copysRouter);
app.use('/clicks', clicksRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  let now = new Date();
  let time = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + ' '
    + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  let meta = '[' + time + '] ' + req.method + ' ' + req.url + '\r\n';
  errorLogfile.write(meta + err.stack + '\r\n\r\n\r\n');

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
