const service = require('../services/users');
const User = require('../modules/users');

/*登录逻辑*/
exports.login = (req, res, next) => {
  const {user_name,user_pwd} = req.body;

  service.login(user_name)
    .then(results => {
      if (typeof results === 'object' && !results.errno) {
        let lock = results[0].user_pwd;
        if(User.checkPassword(user_pwd,lock)){
          req.session.user_name = req.body.user_name;
          res.json({
            ok:true
          })
        }
        else{
          res.status(401);
          res.send({
            msg: '没有权限',
            code: '401'
          })
        }
      } else {
        next(results)
      }
    })
    .catch(err => {
      next(err)
    })
};

/*注册用户*/
exports.register = (req, res, next) => {
  let user = new User(req.body);

  service.register(user)
    .then(results => {
      if (typeof results === 'object' && !results.errno) {
        res.send(results)
      } else {
        next(results)
      }
    })
    .catch(err => {
      next(err)
    })
};
