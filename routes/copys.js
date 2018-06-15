const express = require('express');
const router = express.Router();
const service = require('../services/copys');
const tools = require('../common/tools');
const getClientIp = tools.getClientIp;
const CopyRecord = require('../modules/copys');
const makeConditions = require('../common/conditions');

/*请求一条记录*/
router.get('/get', function(req, res, next) {
  const copy_id = req.query.copy_id;

  service.getCopyRecordById(copy_id)
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

/*增加一条记录*/
router.post('/add',(req,res,next) => {
  let copyRecord = new CopyRecord(req.body)
  copyRecord.click_ip = getClientIp(req);

  service.addOneCopyRecord(copyRecord)
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


module.exports = router;
