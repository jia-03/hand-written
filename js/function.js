//深flat
const deepFlatten = (arr) => {
    return arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);
}
deepFlatten([1, [2],
    [
        [3], 4
    ], 5
]) //[1,2,3,4,5]

//柯里化



// 防抖
function debounce(fn, wait) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

//节流
function throttle(fn, wait) {
    let lock = false;
    return function (...args) {
        if (lock) return;
        fn.apply(this, args);
        lock = true
        setTimeout(() => {
            lock = false
        }, wait)
    }

}