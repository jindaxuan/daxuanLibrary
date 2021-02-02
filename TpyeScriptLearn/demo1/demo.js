// 方法一
function tsdemo(data) {
    console.log(data.y);
    return Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2));
}
tsdemo({ x: 1, y: 123 });
