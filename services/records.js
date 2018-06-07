//业务层面
const dao = require('../daos/records');
const mysql = require('../config/mysql');

exports.getRecordById = record_id => {
  return mysql.getConnection()
    .then(connection=>{
      return dao.queryRecordById(connection,record_id)
        .then(results=>{
          // And done with the connection.
          connection.release();
          return results;
        })
    })
}

//先更改，如果影响的行数为0，则插入
exports.addRecordByIP = record => {
  return mysql.getConnection()
    .then(connection=>{
      return dao.updateOneRecordByIP(connection,record.record_ip)
        .then(results => {
          if(results.affectedRows===0){
            return dao.insertOneRecord(connection,record)
              .then(results => {
                connection.release();
                return results
              })
          }
          else{
            connection.release();
            return results
          }
        })
    })
}

//记录都擦汗如
exports.addOneRecord = record => {
  return mysql.getConnection()
    .then(connection=>{
      return dao.insertOneRecord(connection,record)
        .then(results=>{
          connection.release();
          return results
        })
    })
}

