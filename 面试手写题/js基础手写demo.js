// 实现let，实现const
// let的核心的功能是块级作用域，而var有变量提升这种东西
// var的一个比较坑的点就是，在for循环中用var就会有问题
// 主要为了实现手写
let window = this // 因为这些js我在node环境下执行的，没有window

// 1.实现let
// for (var index = 0; index < 5; index++) {
//    (
//        function (j) {
//            setTimeout(() => {
//             console.log('index',j);
               
//            }, 1000);
//        }
//    )(index)
// }


// 实现const


// let _const = function(window,n,data) {
//     Object.defineProperty(window,n,{
//         writable:false,
//         value:data,
//     })
// }
// _const(window,'a',{b:12}) 
// this.a.b = 'jinxuan'
// console.log('a',this.a);
// this.a = {}
// console.log('a',this.a);



// 手写call
// let obj = {
//     a:12
// }
// let fn = function() {
//     console.log('a',this.a);
// }

// 简陋版
// Function.prototype.myCall= function (thisArg,...args){
//     thisArg.fn = this
//     return thisArg.fn(args)
// }
// fn.myCall(obj)


// 升级版
// Function.prototype.myCall= function (thisArg,...args){
//     // 设置fn为独一无二，防止被覆盖
//     let fn = Symbol('fn')
//     thisArg[fn] = this || window
//     const result = thisArg[fn](args)
//     delete thisArg[fn]
//     return result
// }
// fn.myCall(obj)


// 手写apply
// Function.prototype.myApply = function(thisArg,args){
//     let fn = Symbol('fn')
//     thisArg[fn] = this || window
//     const result = thisArg[fn](...args)
//     delete thisArg[fn]
//     return result
// }
// fn.myApply(obj,[])


// 手写bind
// 简易bind
// Function.prototype.myBind = function(thisArg,...args){
//         return ()=>this.apply(thisArg,[args])
// }
// fn.myBind(obj)()

// 升级bind
/* 
    1.bind()除了this还接收其他参数，bind()返回的函数也接收参数，这两部分的参数都要传给返回的函数
    2.new会改变this指向：如果bind绑定后的函数被new了，那么this指向会发生改变，指向当前函数的实例
    3.没有保留原函数在原型链上的属性和方法
*/
// Function.prototype.myBind = function(thisArg,...args) {
//     const self = this
//     let fbound = function () {
//         // Array.prototype.slice.call 用来处理类数组
//         self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)))
//     }
//     fbound.prototype = Object.create(self.prototype)
//     return fbound

// }

// 手写一个防抖
// const fn2 = function (...args) {
//     console.log('daxuan',args);
    
// }
// function debounce(fn,wait) {
//     let flag = null
//     return function() {
//         if(flag) clearTimeout(flag)
//         flag = setTimeout(() => {
//             fn.apply(this,arguments)
//         }, wait);
//     }
// }
// let a = debounce(fn2)
// a()
// a('21')
// a(12,34,56)


// 手写一个节流函数
// const fn3 = function (...args) {
//     console.log('daxuan',args);
// }
// 时间对比方法
// function throttle(fn,wait) {
//     let flag = null
//     let time1 = 0
//     return function() {
//         let time2 = new Date().getTime()
//         if((time2-time1) >wait) {
//             fn.apply(this,arguments)
//             time1 = time2
//         }
//     }
// }

// flag 标记法
// function throttle(fn,wait) {
//     let flag = null
//     return function() {
//         if(!flag) {
//             flag = setTimeout(() => {
//                 fn.apply(this,arguments)
//                 flag = null
//             }, wait);
//         }
//     }
// }
// let a = throttle(fn3,1000)

// a()

// a('21')
// a(12,34,56)
// setInterval(() => {
//     a('21')
// }, 50);

// 深入思考，如果要让你写一个包含立即执行，取消的节流防抖函数，你会怎么设计，答案是，在settimeout中写flag的转换，通过flag去判断是否要立即执行

// 数组扁平化
let arr = [{a:1},1,[2,3],[4,[5,6]]]
// 方法一
// let arr1 = arr.flat(Infinity)
// console.log('arr',arr1);

// 方法二,只能结构一层
// let arr1 = arr.reduce((data,item)=>{return data.concat(item)},[])
// console.log('arr',arr1);

// 方法三，递归
// function reducePro(arr) {
//     return arr.reduce((data,item)=>{
//          if(Array.isArray(item)){
//             return data.concat(reducePro(item))
//         }else {
//             return data.concat(item)
//         }
//     },[])
// }
// let arr2 = reducePro(arr)
// console.log('arr2',arr2);

// 方法四，迭代➕展开运算符
// let arr3 = arr
// while(arr3.some(Array.isArray)){
//     arr3 = [].concat(...arr3)
// }
// console.log('arr3',arr3,arr);

