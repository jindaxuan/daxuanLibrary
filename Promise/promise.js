

function Promise() {
    let state = 'pending' // 用来表示状态正在pending中
    let value = null   //  暂时没想好用来做什么，后期加上
    const callbacks = [] // 好理解，这个是用来存储callback的
    
    // 接下来就是利用then了,一般来来说then里面传递的还是一个函数function
    this.then = function (onFulfilled,onRejected) {
        // 递归调用,里面有两个函数，一个resolve，一个reject
        return new Promise( (resolve, reject)=>{
            //  将新的promise 的resolve方法，放到前一个promise的回调对象中
            handle(
                {onFulfilled,onRejected,resolve,reject
                })
        })
    }

    function handle(callback) {
        // 如果state当前的装填是pending，就把callback传入callbacks，刚开始肯定会执行
        if(state === 'pending'){
            callbacks.push(callback)
            return 
        }
        const cb = state==='fulfilled'?callback.onFulfilled:callback.onRejected
        const next = state==='fulfilled'?callback.resolve:callback.reject
        if(!cb) {
            next(value)
            return
        }
        const ret = cb(value)
        next(ret)
    }
    function resolve(newValue) {
        const fn = () =>{
            if(state !== 'pending') return
            if(newValue && (typeof newValue === 'object' || typeof newValue === 'function')){
                const {then} = newValue
                if(typeof then === 'function') {
                    // newValue 为新产生的Promise，此时的resolve为上个promise的resolve
                    // 相当于调用了新产生Promise的then方法，注入了上个promise的resolve为其回调
                    then.call(newValue,resolve,reject)
                    return
                }

            }
            state = 'fulfilled';
            value = newValue
            handelCb()
        }
        setTimeout(fn(), 0);   // 基于promiseA+规范
    }
    function handelCb() {
        while(callbacks.length){
            const fulfilledFn = callbacks.shift()
            handle(fulfilledFn)
        }
    }
}