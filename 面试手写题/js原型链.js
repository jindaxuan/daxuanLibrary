// 原型链的核心
// 每个对象都有一个__ptoto__属性指向他的原型对象，实例上找不到的属性会往他的原型对象上找
// 构造函数的prototype也指向其实例的原型对象
// 原型对象的construct指向其构造函数



// 模拟实现new

// function myNew(fn,...args) {
//     // 首先把构造函数原型对象拿过来
//     let obj = Object.create(fn.prototype)
//     // 然后去执行方法
//     const result = fn.apply(obj,args)
//     // 然后去判断是否有返回值，返回值是否是对象，如果是对象返回该对象，否则返回obj
//     return Object.prototype.toString.call(result) === '[object Object]'?result:obj
// }
// // 测试：
// function Foo(name) {
//     this.name = name
//   }
//   const newObj = myNew(Foo, 'zhangsan')
//   console.log(newObj)                 // Foo {name: "zhangsan"}
//   console.log(newObj instanceof Foo)  // true
  

// 寄生组合继承
function Parent(name) {
    this.name = [name]
}

function Child() {
    // 构造函数继承
    Parent.call(this, 'zhangsan') 
}
//原型链继承
// Child.prototype = new Parent()
Child.prototype = Object.create(Parent.prototype)  //将`指向父类实例`改为`指向父类原型`
Child.prototype.constructor = Child
Child.prototype.getName = function() {
    return this.name
}
//测试
const child = new Child()
const parent = new Parent()
child.getName()                  // ['zhangsan']
parent.getName()                 // 报错, 找不到getName()
console.log(child.getName());
console.log(parent.getName());
