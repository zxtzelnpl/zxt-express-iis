const mysql = require('mysql');
const config = require('./db');

const pool = mysql.createPool(config);

exports.getConnection = () => {
  return new Promise((resolve,reject) => {
    pool.getConnection(function(err,connection){
      if(err){
        reject(err)
      }
      else{
        resolve(connection)
      }
    })
  })
}
