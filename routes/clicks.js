const express = require('express');
const router = express.Router();
const service = require('../services/clicks');
const tools = require('../tools');
const getClientIp = tools.getClientIp;
const ClickRecord = require('../modules/clicks');

/* GET records listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource'+tools.zxt++);
});

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
})



module.exports = router;
