//业务层面
const dao = require('../daos/users');
const mysql = require('../config/mysql');

//更具用户名查询记录
exports.login = user_name => {
  return mysql.getConnection()
    .then(connection => {
      return dao.queryUserByName(connection, user_name)
        .then(results => {
          // And done with the connection.
          return results;
        })
        .catch(err => {
          return err
        })
        .then((res) => {
          connection.release();
          return res;
        })
    })
}

//记录插入
exports.register = user => {

  return mysql.getConnection()
    .then(connection => {
      return dao.insertOneUser(connection, user)
        .then(results => {
          return results
        })
        .catch(err => {
          return err
        })
        .then((res) => {
          connection.release();
          return res;
        })
    })
}
