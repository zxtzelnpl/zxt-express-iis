const p1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p1')
    }, 1000)
  })
}

const p2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p2')
    }, 1000)
  })
}

const p3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('p3')
    }, 1000)
  })
}

var str='✓'
console.log(str.slice(0,40))

var str2='✓';
var str3='√';
var str4='√';

console.log(str===str2)
console.log(str3===str2)
var srt5='⛴';
var srt6='✓';
console.log(str2===srt6)
/*
p1()
    .then(res => {
      console.log(res + ':res')
      return p2()
          .then(res => {
            console.log(res + ':res')
            return p3()
                .then(res => {
                  console.log(res + ':res')
                  return res + ':res'
                })
                .catch(res => {
                  console.log(res + ':p3err')
                  // return res + ':p3err';
                  throw new Error(res);
                })
                .then(res => {
                  console.log(res + ':p3after')
                  return (res + ':p3after')
                })
          })
          .then(res => {
            console.log(res + ':p2next')
            return res + ':p2next'
          })
          .catch(err=>{
            console.log(err + ':p2err')
            // return err + ':p2err';
            throw err
          })
          .then(res => {
            console.log(res + ':p2after')
            return (res + ':p2after')
          })
    })
    .then(res => {
      console.log(res + ':next')
      return res + ':next'
    })
    .catch(err => {
      console.log(err + ':err')
      return err + ':err'
    })
    .then(res => {
      console.log(res + ':after')
    })*/
