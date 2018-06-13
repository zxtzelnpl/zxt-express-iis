const express = require('express');
const router = express.Router();
const service = require('../services/records');
const tools = require('../tools');
const getClientIp = tools.getClientIp;
const Record = require('../modules/records');

/* GET records listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/get', function(req, res, next) {
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
  req.body.record_ip = getClientIp(req);
  req.body.record_date = new Date();

  service.addOneRecord(req.body)
    .then(results=>{
      res.send(results)
    })
    .catch(err=>{
      next(err)
    })
})

router.get('/add',(req,res,next) => {

  try{
    req.query.record_ip = getClientIp(req);
    req.query.record_date = new Date();

    let record = new Record(req.query);

    record.record_ip = getClientIp(req);

    service.addOneRecord(record)
      .then(results=>{
        res.send(results)
      })
      .catch(err=>{
        next(err)
      })
  }
  catch(e){
    res.send({
      err:'err'
    })
  }





})



module.exports = router;
