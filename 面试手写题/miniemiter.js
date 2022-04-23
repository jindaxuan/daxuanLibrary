class Event {
    constructor() {
        this.callback = {} // 储存事件
    }
    on (type,fn) {
        // 首先判断，callback对象有没有该事件的回调函数
        if(!this.callback[type]){
            this.callback[type] = []
        }
        this.callback[type].push(fn) // 将回调函数fn存入数组
        return this
    } // 注册事件

    once (type,fn) {
        let _this = this
        if(!this.callback[type]){
            this.callback[type] = []
        }
        const onceFn = (...args) => {
            fn(args)
            // 执行一次之后就去卸载它
        
            _this.off(type,onceFn)
        }
        this.callback[type].push(onceFn)
        return this
    } // 注册只能调用一次的事件

    emit (type,...args) {
        this.callback[type].forEach(item => {
            item(args)
        });
        return this
    } // 触发事件

    off (type,fn) {
       this.callback[type] = this.callback[type].filter(item=>item!==fn)
    } // 移除指定的回调函数
}

