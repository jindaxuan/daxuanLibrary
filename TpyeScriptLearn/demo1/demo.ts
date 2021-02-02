// 方法一

// function tsdemo(data:{x:number,y:number}) {
//     return Math.sqrt(data.x**2 +data.y**2)
// }

// tsdemo({x:1,y:123})

// 方法二
// 类型别名
type Point = {x:number,y:number}

function tsdemo(data:Point) {
    console.log(data.y);
    
    return Math.sqrt(data.x**2 +data.y**2)
}

tsdemo({x:1,y:123})