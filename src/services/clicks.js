//业务层面
const dao = require('../daos/clicks');
const mysql = require('../config/mysql');

//查询某条记录
exports.getClickRecordById = click_id => {
  return mysql.getConnection()
    .then(connection=>{
      return dao.queryClickRecordById(connection,click_id)
          .then(results => {
            // And done with the connection.
            return results;
          }).catch(err => {
            return err;
          })
          .then((res) => {
            connection.release();
            return res;
          })
    })
}

//直接插入一条记录
exports.addOneClickRecord = clickRecord => {
  return mysql.getConnection()
    .then(connection=>{
      return dao.insertOneClickRecord(connection,clickRecord)
          .then(results => {
            return results
          })
          .catch(err => {
            return err
          })
          .then((res) => {
            connection.release();
            return res;
          })
    })
}

//查询所有记录条数
exports.getListsNum = conditions => {
  return mysql.getConnection()
    .then(connection => {
      return dao.getCount(connection, conditions)
        .then(results => {
          return results
        })
        .catch(err => {
          return err
        })
        .then((res) => {
          connection.release();
          return res;
        })
    })
}

//查询一页的记录条数
exports.getOnePageList = (conditions, from,to,order) => {
  return mysql.getConnection()
    .then(connection => {
      return dao.getQueries(connection, conditions,from,to,order)
        .then(results => {
          return results
        })
        .catch(err => {
          return err
        })
        .then((res) => {
          connection.release();
          return res;
        })
    })
}

