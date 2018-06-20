function User(obj){
  this.user_name = obj.user_name;
  this.user_pwd = obj.user_pwd;
  this.create_date = new Date();
  this.last_login = new Date();
}

User.checkPassword = ()=>{

}

module.exports = User;
