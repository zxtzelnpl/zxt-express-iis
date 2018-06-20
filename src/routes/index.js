const express = require('express');

const adminControlls = require('./admin');
const adminRouter = express.Router();

const recordsControlls = require('./records');
const recordsRouter = express.Router();

const clicksControlls = require('./clicks');
const clicksRouter = express.Router();

const copysControlls = require('./copys');
const copysRouter = express.Router();

adminRouter.use(adminControlls.checkSession);

adminRouter.get('/',adminControlls.index);
adminRouter.post('/login',adminControlls.login);
adminRouter.get('/records',recordsControlls.index);
adminRouter.get('/records/get',recordsControlls.getRecordById);
adminRouter.post('/records/total',recordsControlls.getListsNum);
adminRouter.post('/records/page',recordsControlls.getOnePageList);

adminRouter.get('/clicks',clicksControlls.index);
adminRouter.get('/clicks/get',clicksControlls.getClickRecordById);
adminRouter.post('/clicks/total',clicksControlls.getListsNum);
adminRouter.post('/clicks/page',clicksControlls.getOnePageList);

adminRouter.get('/copys/get',copysControlls.getCopyRecordById);
adminRouter.post('/copys/total',copysControlls.getListsNum);
adminRouter.post('/copys/page',copysControlls.getOnePageList);

recordsRouter.post('/get',recordsControlls.addOneRecord);

clicksRouter.post('/get',clicksControlls.addOneClickRecord);

clicksRouter.post('/get',copysControlls.addOneCopyRecord);



module.exports = app=>{
  app.use('/records', recordsRouter);
  app.use('/copys', copysRouter);
  app.use('/clicks', clicksRouter);
  app.use('/admin', adminRouter);
};
