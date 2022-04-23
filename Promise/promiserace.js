

const p1 = Promise.resolve('p1')
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 延时一秒')
  }, 1000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3 延时两秒')
  }, 2000)
})

// const p4 = Promise.reject('p4 rejected')

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p5 rejected 延时1秒')
  }, 1500)
})


let promiseRace = function(arr) {
    return new Promise((resolve,reject)=>{
        // 此处用了let块级别作用域，因此无需在for里用立即执行函数了
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then(res=>{
                resolve(res)
            }).catch(reject)          
        }
    })
    
}

promiseRace([p1,p2,p5]).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})