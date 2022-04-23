const p1 = Promise.resolve("p1");
const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000,"p2 延时一秒");
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000,"p3 延时两秒");
});

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p5 rejected 延时1秒");
  }, 1500);
});

let promiseAllSettled = function (arr) {
  let count = 0;
  let temparr = [];
  return new Promise((resolve, reject) => {
    // 此处用了let块级别作用域，因此无需在for里用立即执行函数了'
    function fixadd(i,obj) {
        count++
        temparr[i] = obj
        if (count === arr.length) {
            resolve(temparr);
          }
    }
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i])
        .then((res) => {
            fixadd(i,{'status':'fufilled',value:res})
        })
        .catch(res=>{
            fixadd(i,{'status':'reject',value:res})
        });
    }
  });
};


// Promise.allSettled([p1,p2,p5]).then(res=>console.log('res',res))
promiseAllSettled([p1,p2,p5]).then(res=>{console.log('res',res)})
