//业务层面
const dao = require('../daos/clicks');
const mysql = require('../config/mysql');

//查询某条记录
exports.getClickRecordById = click_id => {
  return mysql.getConnection()
    .then(connection=>{
      return dao.queryClickRecordById(connection,click_id)
        .then(results=>{
          // And done with the connection.
          connection.release();
          return results;
        })
    })
}

//直接插入一条记录
exports.addOneClickRecord = clickRecord => {
  return mysql.getConnection()
    .then(connection=>{
      return dao.insertOneClickRecord(connection,clickRecord)
        .then(results=>{
          connection.release();
          return results
        })
    })
}

