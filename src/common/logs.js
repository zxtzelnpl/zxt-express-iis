const logger = require('morgan');
const accessLogfile = require('../common/files').accessLogfile;

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

function logs(app){
  // 使用自定义的format
// 测试环境的话，打印出来
  if (app.get('env') === 'development') {
    app.use(logger('joke'));
    // app.use(logger('dev')); 默认配置
  }
  app.use(logger('joke', {skip: skip, stream: accessLogfile})); //打印到日志文件中
}

module.exports = logs;
