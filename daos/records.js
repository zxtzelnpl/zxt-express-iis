// 持久层

//根据id查询
exports.queryRecordById = (connection, record_id) => {
  const sql = "SELECT * FROM records where record_id = ?";

  return new Promise((resolve, reject) => {
    connection.query(sql, record_id, function (err, results) {
      if (err) {
        reject(err)
      }
      else {
        resolve(results)
      }
    })
  })
}

//根据ip更新
exports.updateOneRecordByIP = (connection, record_ip) => {
  const sql = "UPDATE records SET record_num=record_num+1 where record_ip = ?";

  return new Promise((resolve, reject) => {
    connection.query(sql, record_ip, function (err, results) {
      if (err) {
        reject(err);
      }
      else {
        resolve(results);
      }
    })
  })
}

//插入一条记录
exports.insertOneRecord = (connection, record) => {
  const sql = "INSERT INTO records SET ?";
  return new Promise((resolve, reject) => {
    connection.query(sql, record, function (err, results) {
      if (err) {
        reject(err)
      }
      else {
        resolve(results)
      }
    })
  })
}


