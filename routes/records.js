const express = require('express');
const router = express.Router();
const service = require('../services/records');
const tools = require('../common/tools');
const getClientIp = tools.getClientIp;
const Record = require('../modules/records');
const makeConditions = require('../common/conditions');

/* GET records listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource'+tools.zxt++);
});

/*根据id获取一条记录*/
router.get('/get', (req, res, next) => {
  const record_id = req.query.record_id;

  service.getRecordById(record_id)
    .then(results=>{
      if(typeof results === 'object'&&!results.errno){
        res.send(results)
      }else{
        next(results)
      }
    })
    .catch(err=>{
      next(err)
    })
});

/*插入一条记录*/
router.post('/add',(req,res,next) => {
  let record = new Record(req.body);

  service.addOneRecord(record)
    .then(results=>{
      if(typeof results === 'object'&&!results.errno){
        res.send(results)
      }else{
        next(results)
      }
    })
    .catch(err=>{
      next(err)
    })
})

/*获取总的记录数据*/
router.post('/total',(req,res,next) => {
  let conditions = new makeConditions(req.body)

  service.getListsNum(conditions)
    .then(results=>{
      if(typeof results === 'object'&&!results.errno){
        res.send(results)
      }else{
        next(results)
      }
    })
    .catch(err=>{
      next(err)
    })
})

/*查询一页的数据*/
router.post('/page',(req,res,next) => {
  const {from,to} = req.body;
  let conditions = new makeConditions(req.body)

  service.getOnePageList(conditions,from,to)
    .then(results=>{
      if(typeof results === 'object'&&!results.errno){
        res.send(results)
      }else{
        next(results)
      }
    })
    .catch(err=>{
      next(err)
    })
})

// router.get('/add',(req,res,next) => {
//
//   req.query.record_ip = getClientIp(req);
//   req.query.record_date = new Date();
//
//   let record = new Record(req.query);
//
//   record.record_ip = getClientIp(req);
//
//   service.addOneRecord(record)
//       .then(results=>{
//         res.send(results)
//       })
//       .catch(err=>{
//         next(err)
//       })
// })



module.exports = router;
