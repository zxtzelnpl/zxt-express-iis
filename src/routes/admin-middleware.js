exports.checkSession = (req, res, next) => {
  if(req.session.name){
    next()
  }
  else{
    res.status(403);
    res.send({
      msg:'没有权限',
      code:'12345'
    })
  }
}

