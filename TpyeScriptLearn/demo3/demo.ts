// 函数结构类型的类型注解

function add({first,second}:{first:number,second:number}):number{
    return first + second
}
const total2 = add({first:1,second:2})