const service = require('../services/records');
const tools = require('../common/tools');
const getClientIp = tools.getClientIp;
const Record = require('../modules/records');
const makeConditions = require('../common/conditions').makeRecordConditions;
const makeOrder = require('../common/order');

/* Check Page */
exports.index = (req, res, next) => {
  res.send('respond with a resource' + tools.zxt++);
};

/*请求一条记录*/
exports.getRecordById = (req, res, next) => {
  const record_id = req.query.record_id;

  service.getRecordById(record_id)
      .then(results => {
        if (typeof results === 'object' && !results.errno) {
          res.send(results)
        } else {
          next(results)
        }
      })
      .catch(err => {
        next(err)
      })
};

/*增加一条记录*/
exports.addOneRecord = (req, res, next) => {
  let record = new Record(req.body);
  record.click_ip = getClientIp(req);

  service.addOneRecord(record)
      .then(results => {
        if (typeof results === 'object' && !results.errno) {
          res.send(results)
        } else {
          next(results)
        }
      })
      .catch(err => {
        next(err)
      })
};

/*获取总的记录数据*/
exports.getListsNum = (req, res, next) => {
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
};

/*查询一页的数据*/
exports.getOnePageList = (req, res, next) => {
  const {pageSize, current, sorter} = req.body;
  const from = pageSize*(current-1) + 1;
  const to = pageSize*current;
  const order = makeOrder(sorter);
  let conditions = makeConditions(req.body)

  service.getOnePageList(conditions, from, to, order)
      .then(results => {
        if (typeof results === 'object' && !results.errno) {
          res.send({
            pageSize,
            current,
            list:results
          })
        } else {
          next(results)
        }
      })
      .catch(err => {
        next(err)
      })
};
