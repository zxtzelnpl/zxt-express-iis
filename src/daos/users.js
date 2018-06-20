// 持久层

//根据user_name查询
exports.queryUserByName = (connection, user_name) => {
  const sql = "SELECT * FROM users where user_name = ?";

  return new Promise((resolve, reject) => {
    connection.query(sql, user_name, function (err, results) {
      if (err) {
        reject(err)
      }
      else {
        resolve(results)
      }
    })
  })
}

//插入一条记录
exports.insertOneUser = (connection, user) => {
  const sql = "INSERT INTO users SET ?";
  return new Promise((resolve, reject) => {
    connection.query(sql, user, function (err, results) {
      if (err) {
        reject(err)
      }
      else {
        resolve(results)
      }
    })
  })
}
