// 持久层

//根据id查询
exports.queryClickRecordById = (connection, click_id) => {
  const sql = "SELECT * FROM clicks where click_id = ?";

  return new Promise((resolve, reject) => {
    connection.query(sql, click_id, function (err, results) {
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
exports.insertOneClickRecord = (connection, clickRecord) => {
  const sql = "INSERT INTO clicks SET ?";
  return new Promise((resolve, reject) => {
    connection.query(sql, clickRecord, function (err, results) {
      if (err) {
        reject(err)
      }
      else {
        resolve(results)
      }
    })
  })
}
