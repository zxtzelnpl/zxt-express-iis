function ClickRecord(obj){
  this.copy_date = new Date();
  this.copy_title = obj.copy_title;
  this.copy_device = obj.copy_device;
  this.copy_team = obj.copy_team;
  this.copy_text = obj.copy_text;
}

module.exports = ClickRecord;
