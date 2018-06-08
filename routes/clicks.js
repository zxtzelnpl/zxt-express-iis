const express = require('express');
const router = express.Router();
const service = require('../services/clicks');

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}

/*请求一条记录*/
router.get('/get', function(req, res, next) {
  const click_id = req.query.click_id;

  service.getClickRecordById(click_id)
    .then(results=>{
      res.send(results)
    })
    .catch(err=>{
      next(err)
    })
});

/*增加一条记录*/
router.post('/add',(req,res,next) => {
  req.body.click_ip = getClientIp(req);
  req.body.click_date = new Date();

  service.addOneClickRecord(req.body)
    .then(results=>{
      res.send(results)
    })
    .catch(err=>{
      next(err)
    })
})



module.exports = router;