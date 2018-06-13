const express = require('express');
const router = express.Router();
const service = require('../services/copys');
const tools = require('../tools');
const getClientIp = tools.getClientIp;

/*请求一条记录*/
router.get('/get', function(req, res, next) {
  const copy_id = req.query.copy_id;

  service.getCopyRecordById(copy_id)
    .then(results=>{
      res.send(results)
    })
    .catch(err=>{
      next(err)
    })
});

/*增加一条记录*/
router.post('/add',(req,res,next) => {
  req.body.copy_ip = getClientIp(req);
  req.body.copy_date = new Date();

  service.addOneCopyRecord(req.body)
    .then(results=>{
      res.send(results)
    })
    .catch(err=>{
      next(err)
    })
})



module.exports = router;
