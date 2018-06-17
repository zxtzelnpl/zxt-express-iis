const express = require('express');
const router = express.Router();
const tools = require('../common/tools');

function checkSession(req, res, next){
  console.log(req.session)
  console.log(req.session.views)
  console.log(typeof req.session.views)

  if (typeof req.session.views === "number") {
    console.log(req.session.views);
    req.session.views = req.session.views+1;
    console.log(req.session.views)
  }
  else{
    req.session.views = 0;
  }
  next()
}

/* GET home page. */
router.get('/',checkSession, function (req, res, next) {




  res.render('admin',
      {
        title: 'admin',
        NODE_ENV:process.env.NODE_ENV,
        text:req.session.views,
        layout:false
      }
  );



});

module.exports = router;
