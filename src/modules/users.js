const crypto = require('crypto');


function User(obj) {
  this.user_name = obj.user_name;
  this.user_pwd = crypto.createHash('md5').update(obj.user_pwd, 'utf8').digest('hex');
  this.create_date = new Date();
  this.last_login = new Date();
}

User.checkPassword = (key,lock) => {
  return crypto.createHash('md5').update(key, 'utf8').digest('hex') === lock;
}

module.exports = User;
