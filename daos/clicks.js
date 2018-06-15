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

//获取总记录条数
exports.getCount = (connection, conditions) => {
  let sql = 'SELECT COUNT(*) FROM clicks';

  conditions.forEach((condition, index) => {
    if (index === 0) {
      sql += ` where ${condition.field} ${condition.operation} ${condition.value}`;
    }
    else {
      sql += ` and ${condition.field} ${condition.operation} ${condition.value}`;
    }
  })

  return new Promise((resolve, reject) => {
    connection.query(sql, function (err, results) {
      if (err) {
        reject(err)
      }
      else {
        resolve(results)
      }
    })
  })
}

//获取一页记录数量
exports.getQueries = (connection, conditions, from, to) => {
  let sql = 'SELECT * FROM clicks';

  conditions.forEach((condition, index) => {
    if (index === 0) {
      sql += ` where ${condition.field} ${condition.operation} ${condition.value}`;
    }
    else {
      sql += ` and ${condition.field} ${condition.operation} ${condition.value}`;
    }
  })

  sql+=` limit ${from},${to}`;

  return new Promise((resolve, reject) => {
    connection.query(sql, function (err, results) {
      if (err) {
        reject(err)
      }
      else {
        resolve(results)
      }
    })
  })
}
