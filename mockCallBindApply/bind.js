//测试
const obj = { name: '大煊写代码cao' }
function foo() {
    console.log(this.name)
    console.log(arguments)
}

Function.prototype.myBind = function(thisArg,...args) {
    let self = this
    let bound = function () {
        console.log('arguments',arguments,'args',args);
        console.log('slice.call',Array.prototype.slice.call(arguments));
        
        
        self.apply(this instanceof self?this:thisArg,args.concat(Array.prototype.slice.call(arguments)))
        bound.prototype = Object.create(self.prototype)
    }
    return bound
}

foo.myBind(obj, 'a', 'b', 'c')()