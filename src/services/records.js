//业务层面
const dao = require('../daos/records');
const mysql = require('../config/mysql');

exports.getRecordById = record_id => {
  return mysql.getConnection()
      .then(connection => {
        return dao.queryRecordById(connection, record_id)
            .then(results => {
              // And done with the connection.
              return results;
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

//先更改，如果影响的行数为0，则插入
exports.addRecordByIP = record => {
  return mysql.getConnection()
      .then(connection => {
        return dao.updateOneRecordByIP(connection, record.record_ip)
            .then(results => {
              if (results.affectedRows === 0) {
                return dao.insertOneRecord(connection, record)
                    .then(results => {
                      return results;
                    })
                    .catch(err => {
                      return err;
                    })
                    .then((res) => {
                      connection.release();
                      return res;
                    })
              }
              else {
                return results
              }
            })
            .catch(err => {
              return err;
            })
            .then((res) => {
              connection.release();
              return res;
            })
      })
}

//记录都擦汗如
exports.addOneRecord = record => {

  return mysql.getConnection()
      .then(connection => {
        return dao.insertOneRecord(connection, record)
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
exports.getOnePageList = (conditions, from, to) => {
  return mysql.getConnection()
      .then(connection => {
        return dao.getQueries(connection, conditions, from, to)
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
