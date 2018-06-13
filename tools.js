exports.getClientIp = req=>{
  let ip;

  try{
    ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  }
  catch(e){
    ip = 'error'
  }

  return ip;
}
