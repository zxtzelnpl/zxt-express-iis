const express = require('express');
const router = express.Router();
const tools = require('../common/tools');

/* GET home page. */
router.get('/', function (req, res, next) {


  console.log(req.session)
  console.log(typeof req.session)
  console.log(req.session.login)
  console.log(Boolean(req.session.login))
  console.log(typeof req.session.login)

  if(!req.session.login){
    console.log('no login')
    req.session.login = true
  }
  else{
    console.log('yes we login')
  }

  res.render('admin',
    {
      title: req.session.login?'admin':'login',
      NODE_ENV:process.env.NODE_ENV,
      text:tools.zxt++,
      layout:false
    }
  );

  console.log(`the ${tools.zxt} ends`)

});

module.exports = router;
