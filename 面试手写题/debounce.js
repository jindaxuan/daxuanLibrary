


 function debounce (fn,timeout=1000) {
    let flag = null
    return function(...args){
        if(flag){
             clearTimeout(flag)
             flag = null
        }
        flag = setTimeout(() => {
            fn.apply(this,args)
        }, timeout);
    }
}

function print(a) {
    let b = 'this is sb'
    console.log('123',b);
}

let debouncefun = debounce(print,1000)

setTimeout(() => {
    debouncefun('abc')
    debouncefun('efg')
    debouncefun('hij')
}, 10);
