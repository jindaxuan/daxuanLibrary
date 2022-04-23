
 function throttle (fn,timeout=1000) {
    let flag = null
    return function(...args){
        if(!flag){
            flag = setTimeout(() => {
                flag = null
                fn.apply(this,args)
            }, timeout);
        }
        
    }
}

function print(a) {
    let b = 'this is sb'
    console.log('123',a,b);
}

let throttlefun = throttle(print,1000)

// setTimeout(() => {
    throttlefun('abc')
    
// }, 1000);

// setTimeout(() => {
    throttlefun('efg')
// }, 2010);

