// type annotation 类型注解
// type inference 类型推断，TS会自动的去尝试分析变量的类型
// 如果TS能够自动分析变量类型，我们就什么也不需要做

let countInference = 123  // 类型推断

const firstNumber = 1
const secondNumber = 2
const total = firstNumber +secondNumber  // 当鼠标放total上的时候，total自动提示number，所以不需要对total进行注解

// 这个时候还可以在函数后加一层约束，虽然他本身就会进行类型推断function():number{}
function getTotal (first:number,second:number){
    return first + second
}
const totals = getTotal(1,2)
