const express = require('express');
const router = express.Router();
const service = require('../services/copys');
const tools = require('../tools');
const getClientIp = tools.getClientIp;
const CopyRecord = require('../modules/copys');

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



module.exports = router;
