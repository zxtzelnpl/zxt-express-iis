const service = require('../services/clicks');
const tools = require('../common/tools');
const getClientIp = tools.getClientIp;
const ClickRecord = require('../modules/clicks');
const makeConditions = require('../common/conditions').makeClickConditions;
const makeOrder = require('../common/order');

/* GET records listing. */
exports.index = (req, res) => {
  res.send('respond with a resource'+tools.zxt++);
}

/*请求一条记录*/
exports.getClickRecordById = (req, res, next) => {
  const click_id = req.query.click_id;

  service.getClickRecordById(click_id)
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

/*增加一条记录*/
exports.addOneClickRecord = (req,res,next) => {
  let clickRecord = new ClickRecord(req.body)
  clickRecord.click_ip = getClientIp(req);

  service.addOneClickRecord(clickRecord)
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
    .then(results => {
      if (typeof results === 'object' && !results.errno) {
        res.send({
          total:results[0]['COUNT(*)']
        })
      } else {
        next(results)
      }
    })
    .catch(err => {
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

