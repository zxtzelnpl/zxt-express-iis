const express = require('express');
const router = express.Router();
const service = require('../services/records');
const tools = require('../tools');
const getClientIp = tools.getClientIp;
const Record = require('../modules/records');

/* GET records listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource'+tools.zxt++);
});

router.get('/get', (req, res, next) => {
  const record_id = req.query.record_id;

  service.getRecordById(record_id)
    .then(results=>{
      res.send(results)
    })
    .catch(err=>{
      next(err)
    })
});

router.post('/add',(req,res,next) => {
  let record = new Record(req.body);
  record.record_ip =getClientIp(req);

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

router.post('/total',(req,res,next) => {

})

router.post('/page',(req,res,next) => {

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
