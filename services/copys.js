//业务层面
const dao = require('../daos/copys');
const mysql = require('../config/mysql');

//查询某条记录
exports.getCopyRecordById = copy_id => {
  return mysql.getConnection()
    .then(connection=>{
      return dao.queryCopyRecordById(connection,copy_id)
        .then(results=>{
          // And done with the connection.
          connection.release();
          return results;
        })
    })
}

//直接插入一条记录
exports.addOneCopyRecord = copyRecord => {
  return mysql.getConnection()
    .then(connection=>{
      return dao.insertOneCopyRecord(connection,copyRecord)
        .then(results=>{
          connection.release();
          return results
        })
    })
}

