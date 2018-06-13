function Record(obj){
  this.record_date = new Date();
  this.record_title = obj.record_title;
  this.record_device = obj.record_device;
  this.record_team = obj.record_team;
}

module.exports = Record;
