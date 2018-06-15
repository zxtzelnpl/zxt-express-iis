const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const logger = require('morgan');
const FileStreamRotator = require('file-stream-rotator')
const logDirectory = path.join(__dirname, '../logs')

const indexRouter = require('./routes/index');
const clicksRouter = require('./routes/clicks');
const copysRouter = require('./routes/copys');
const recordsRouter = require('./routes/records');

const app = express();

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
let accessLogfile = FileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
let errorLogfile = FileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: path.join(logDirectory, 'error-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

// 自定义token
logger.token('from', function (req, res) {
  return JSON.stringify(req.query) || '-';
});

logger.token('time', function (req, res) {
  return new Date().Format("yyyy-MM-dd hh:mm:ss");
});

logger.token('nextROw', function (req, res) {
  return "\r\n";
});

// 自定义format，其中包含自定义的token
logger.format('joke', '[joke] :time :remote-addr :remote-user :method :url :from :status :referrer :response-time ms :user-agent :nextROw');

//跳过不需要记录的请求
function skip(req) {
  return (req.url).indexOf('stylesheets') != -1
}

// 使用自定义的format
// 测试环境的话，打印出来
if (process.env.NODE_ENV === 'development') {
  app.use(logger('joke'));
}
app.use(logger('joke', {skip: skip, stream: accessLogfile})); //打印到日志文件中

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/', indexRouter);
app.use('/records', recordsRouter);
app.use('/copys', copysRouter);
app.use('/clicks', clicksRouter);

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
