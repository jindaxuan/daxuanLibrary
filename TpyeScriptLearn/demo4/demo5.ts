// 写函数的两种方式


// 下面不用写:number 是因为他会类型推断
const func = (str: string) =>{
    return parseInt(str,10)
}

const func1: (str:string) => number = (str) =>{
    return parseInt(str,10)
}