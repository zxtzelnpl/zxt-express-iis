const moment = require('moment');
const format = 'YYYY-MM-DD HH:mm:ss'

function makeRecordConditions(obj){
  let conditions = [];

  if(obj.record_title){
    conditions.push({
      field:'record_title',
      operation:'LIKE',
      value:`'%${obj.record_title}%'`
    })
  }

  if(obj.record_team){
    conditions.push({
      field:'record_team',
      operation:'=',
      value:`'${obj.record_team}'`
    })
  }

  if(obj.record_device){
    conditions.push({
      field:'record_device',
      operation:'=',
      value:`'${obj.record_device}'`
    })
  }

  if(obj.record_date_from&&obj.record_date_to){
    let from = moment(obj.record_date_from).format(format);
    let to = moment(obj.record_date_to).format(format);

    conditions.push({
      field:'record_date',
      operation:'BETWEEN',
      value:`'${from}' AND '${to}'`
    })
  }
  else if(obj.record_date_from){
    let from = moment(obj.record_date_from).format(format);

    conditions.push({
      field:'record_date',
      operation:'>',
      value:`'${from}'`
    })
  }
  else if(obj.record_date_to){
    let to = moment(obj.record_date_to).format(format);

    conditions.push({
      field:'record_date',
      operation:'<',
      value:`'${to}'`
    })
  }

  return conditions
}

function makeClickConditions(obj){
  let conditions = [];

  if(obj.click_title){
    conditions.push({
      field:'click_title',
      operation:'LIKE',
      value:`'%${obj.click_title}%'`
    })
  }

  if(obj.click_team){
    conditions.push({
      field:'click_team',
      operation:'=',
      value:`'${obj.click_team}'`
    })
  }

  if(obj.click_btn){
    conditions.push({
      field:'click_btn',
      operation:'=',
      value:`'${obj.click_btn}'`
    })
  }

  if(obj.click_device){
    conditions.push({
      field:'click_device',
      operation:'=',
      value:`'${obj.click_device}'`
    })
  }

  if(obj.click_date_from&&obj.click_date_to){
    let from = moment(obj.click_date_from).format(format);
    let to = moment(obj.click_date_to).format(format);

    conditions.push({
      field:'click_date',
      operation:'BETWEEN',
      value:`'${from}' AND '${to}'`
    })
  }
  else if(obj.click_date_from){
    let from = moment(obj.click_date_from).format(format);

    conditions.push({
      field:'click_date',
      operation:'>',
      value:`'${from}'`
    })
  }
  else if(obj.click_date_to){
    let to = moment(obj.click_date_to).format(format);

    conditions.push({
      field:'click_date',
      operation:'<',
      value:`'${to}'`
    })
  }

  return conditions;
}

function makeCopyConditions(obj){
  let conditions = [];

  if(obj.copy_title){
    conditions.push({
      field:'copy_title',
      operation:'LIKE',
      value:`'%${obj.copy_title}%'`
    })
  }

  if(obj.copy_team){
    conditions.push({
      field:'copy_team',
      operation:'=',
      value:`'${obj.copy_team}'`
    })
  }

  if(obj.copy_text){
    conditions.push({
      field:'copy_text',
      operation:'=',
      value:`'${obj.copy_text}'`
    })
  }

  if(obj.copy_device){
    conditions.push({
      field:'copy_device',
      operation:'=',
      value:`'${obj.copy_device}'`
    })
  }

  if(obj.copy_date_from&&obj.copy_date_to){
    let from = moment(obj.copy_date_from).format(format);
    let to = moment(obj.copy_date_to).format(format);

    conditions.push({
      field:'copy_date',
      operation:'BETWEEN',
      value:`'${from}' AND '${to}'`
    })
  }
  else if(obj.copy_date_from){
    let from = moment(obj.copy_date_from).format(format);

    conditions.push({
      field:'copy_date',
      operation:'>',
      value:`'${from}'`
    })
  }
  else if(obj.copy_date_to){
    let to = moment(obj.copy_date_to).format(format);

    conditions.push({
      field:'copy_date',
      operation:'<',
      value:`'${to}'`
    })
  }

  return conditions;
}

exports.makeRecordConditions = makeRecordConditions
exports.makeClickConditions = makeClickConditions
exports.makeCopyConditions = makeCopyConditions
