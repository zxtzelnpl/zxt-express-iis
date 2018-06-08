// 持久层

//根据id查询
exports.queryCopyRecordById = (connection, copy_id) => {
  const sql = "SELECT * FROM copys where copy_id = ?";

  return new Promise((resolve, reject) => {
    connection.query(sql, copy_id, function (err, results) {
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
exports.insertOneCopyRecord = (connection, copyRecord) => {
  const sql = "INSERT INTO copys SET ?";
  return new Promise((resolve, reject) => {
    connection.query(sql, copyRecord, function (err, results) {
      if (err) {
        reject(err)
      }
      else {
        resolve(results)
      }
    })
  })
}
