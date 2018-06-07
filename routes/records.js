const express = require('express');
const router = express.Router();
const service = require('../services/records');

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

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
  req.body.record_data = new Date();

  service.addOneRecord(req.body)
    .then(results=>{
      res.send(results)
    })
    .catch(err=>{
      next(err)
    })
})



module.exports = router;
