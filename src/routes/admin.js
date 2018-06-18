const express = require('express');
const router = express.Router();
const tools = require('../common/tools');
const middleware = require('./admin-middleware');


/* GET home page. */
router.get('/',middleware.checkSession, function (req, res, next) {

  res.render('admin',
      {
        title: 'admin',
        layout:false
      }
  );
});

module.exports = router;
