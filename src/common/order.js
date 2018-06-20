function makeOrder(sort) {

  if(typeof sort ==='undefined'){
    return null;
  }

  let obj = null;

  let array = sort.split('_');
  if (array.length > 1) {
    obj = {
      orderSort: array.pop().replace('end','').toUpperCase(),
      orderBy: array.join('_')
    }
  }
  return obj
}

module.exports = makeOrder
