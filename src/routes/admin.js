const tools = require('../common/tools');

exports.index = (req, res, next) => {
  res.render('admin',
      {
        title: 'admin',
        layout: false
      }
  );
}

exports.checkSession = (req, res, next) => {

  if(req.url==='/login'){
    next()
  }else if (req.session.user_name) {
    next()
  }
  else {
    res.status(401);
    res.send({
      msg: '没有权限',
      code: '401'
    })
  }
}
