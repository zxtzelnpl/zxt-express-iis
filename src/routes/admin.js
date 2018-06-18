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

  console.log(req.get('Content-Type'))

  if (req.session.name) {
    next()
  }
  else {
    res.status(403);
    res.send({
      msg: '没有权限',
      code: '12345'
    })
  }
}
