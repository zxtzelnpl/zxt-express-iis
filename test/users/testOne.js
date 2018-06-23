const service = require('../../src/services/users');
const User = require('../../src/modules/users');

const user_name = 'zxt', user_pwd = '123';
const mysql = require('../../src/config/mysql');

mysql.getConnection().then(connection => {
  const sql = "SELECT * FROM users where user_name = ?";
  connection
      .query(sql, user_name)
      .on('result', function (row, index) {
        console.log(JSON.stringify(row))
      })
})

function next(obj) {
  console.log(obj)
}

const res = {
  statusCode: 200,
  status: function (code) {
    this.statusCode = code;
  },
  send: function (obj) {
    console.log(obj)
  },
  json: function (obj) {
    console.log(obj)
  }
}


/*
service.login(user_name)
    .then(results => {
      if (typeof results === 'object' && !results.errno) {
        let lock = results[0].user_pwd;
        if(User.checkPassword(user_pwd,lock)){
          return res.json({
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
    })*/
