// 持久层

//根据user_name查询
// exports.queryUserByName = "SELECT * FROM users where user_name = ?";
exports.queryUserByName = (connection, user_name) => {
  const sql = "SELECT * FROM users where user_name = ?";

  console.log(user_name)

  return new Promise((resolve, reject) => {
    connection.query(sql, user_name, (err, results) => {
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
    connection.query(sql, user, (err, results) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(results)
      }
    })
  })
}

exports.updateOneUser = (connection, user_name, last_login)=>{
  const sql = "UPDATE users SET last_login = ? WHERE user_name = ?";
  return new Promise((resolve, reject)=>{
    connection.query(sql,last_login,user_name,(err,results) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(results)
      }
    })
  })
}
