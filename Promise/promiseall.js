let prom = new Promise((resolve)=>{
        setTimeout(() => {
            console.log('i',1);
            resolve('qunimeide')
        }, 100);
})
// prom.then(res=>console.log('res',res))
const p1 = Promise.resolve('p1')
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 延时一秒')
  }, 1000)
})
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('p3 延时两秒')
//   }, 2000)
// })


const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p5 rejected 延时1秒')
  }, 1500)
})

// let arr = [prom,prom,prom]
// 小tips，数组快速填充方法，这就不需要用上面的方法
let arr = (Array(3)).fill(prom)


let promiseAll = function(arr) {
    let count = 0
    let temparr = []
    return new Promise((resolve,reject)=>{
        // 此处用了let块级别作用域，因此无需在for里用立即执行函数了
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then(res=>{
                count++
                temparr[i] = res
                if(count===arr.length){
                    resolve(temparr)
                }
            }).catch(reject)         
        }
    })
    
}
// promiseAll(arr).then(res=>{
//     console.log(res);
// })


promiseAll([p1,p2,p5]).then(res=>{
    console.log(res);
}).catch(err=>{
    console.log('err',err);
})
// p2.then(res=>console.log(res))