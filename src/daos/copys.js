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

//获取总记录条数
exports.getCount = (connection, conditions) => {
  let sql = 'SELECT COUNT(*) FROM copys';

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
exports.getQueries = (connection, conditions, from, to, order) => {
  let sql = 'SELECT * FROM copys';

  conditions.forEach((condition, index) => {
    if (index === 0) {
      sql += ` where ${condition.field} ${condition.operation} ${condition.value}`;
    }
    else {
      sql += ` and ${condition.field} ${condition.operation} ${condition.value}`;
    }
  })

  if(order!==null){
    sql+= ` ORDER BY ${order.orderBy} ${order.orderSort}`
  }

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
