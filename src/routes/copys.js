const service = require('../services/copys');
const tools = require('../common/tools');
const getClientIp = tools.getClientIp;
const CopyRecord = require('../modules/copys');
const makeConditions = require('../common/conditions').makeCopyConditions;
const makeOrder = require('../common/order');

/*请求一条记录*/
exports.getCopyRecordById = (req, res, next) => {
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
};

/*增加一条记录*/
exports.addOneCopyRecord = (req,res,next) => {
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
}

/*获取总的记录数据*/
exports.getListsNum = (req,res,next) => {
  let conditions = makeConditions(req.body)

  service.getListsNum(conditions)
      .then(results=>{
        if(typeof results === 'object'&&!results.errno){
          res.send({
            total:results[0]['COUNT(*)']
          })
        }else{
          next(results)
        }
      })
      .catch(err=>{
        next(err)
      })
}

/*查询一页的数据*/
exports.getOnePageList = (req,res,next) => {
  const {pageSize, current, sorter} = req.body;
  const from = pageSize*(current-1);
  const to = pageSize*current;
  const order = makeOrder(sorter);
  let conditions = makeConditions(req.body)

  service.getOnePageList(conditions,from,to,order)
      .then(results=>{
        if(typeof results === 'object'&&!results.errno){
          res.send({
            pageSize,
            current,
            list:results
          })
        }else{
          next(results)
        }
      })
      .catch(err=>{
        next(err)
      })
}
