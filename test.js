const tools1 = require('./src/common/tools');

const tools2 = require('./src/common/tools');

console.log('tools1.zxt:'+tools1.zxt);//0
console.log('tools2.zxt:'+tools2.zxt);//0

console.log('change at once');
tools1.zxt++

console.log('tools1.zxt:'+tools1.zxt);//1
console.log('tools2.zxt:'+tools2.zxt);//1

const tools3 = require('./src/common/tools');
console.log('tools3.zxt:'+tools3.zxt);//1
