//变更函数调用者示例
function foo() {
    console.log(this.name)
}

// 测试
const obj = {
    name: '这是大煊mock的一个call'
}

Function.prototype.myCall = function (thisArg,...args) {
    const fn = Symbol('fn')
    thisArg = thisArg || window
    thisArg[fn] = this
    console.log('thisArg',thisArg,this); // this就是function，thisArg就是
    const result = thisArg[fn](args)
    delete thisArg[fn]
    return result
}
foo.myCall(obj,'123','88')