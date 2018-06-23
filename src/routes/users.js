const service = require('../services/users');
const User = require('../modules/users');

/*登录逻辑*/
exports.login = (req, res, next) => {
  let {user_name,user_pwd} = req.body;

  if(!user_name||!user_pwd){
    let {userName,password} = req.body;

    console.log(userName,password)

    user_name = userName;
    user_pwd = password;
  }

  console.log(user_name,user_pwd)

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

exports.logout = (req,res,next) => {
  if(req.session.user_name){
    delete req.session.user_name;

    res.json({
      ok:true
    })
  }else{
    next()
  }
}

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
