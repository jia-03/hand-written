let testArr = [9, 5, 3, 2, 1, 7, 6, 8, 4]

//冒泡排序
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let tem = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tem;
            }
        }

    }
    return arr
}

// console.log(bubbleSort(testArr))

//快排  
//取一个 中间基准点,左右对比,最后递归处理
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    //取个点吧
    const midIdex = Math.floor(arr.length / 2);
    //取中间值
    const midIdexVal = arr.splice(midIdex, 1)[0];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > midIdexVal) {
            right.push(arr[i]);
        } else {
            left.push(arr[i]);
        }
    }
    return quickSort(left).concat(midIdexVal, quickSort(right));

}
// console.log(quickSort(testArr))

//归并排序 merge 
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let midIndex = Math.floor(arr.length / 2);
    let left = arr.slice(0, midIndex);
    let right = arr.slice(midIndex);

    return merge(mergeSort(left), mergeSort(right));

}

function merge(left, right) {

    const result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());

        }
    }

    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }
    return result
}

console.log(mergeSort(testArr))


// 查找算法

//二分查找
function binarySearch(arr, target){
    let max = arr.length - 1
    let min = 0
    while (min <= max) {
        let mid = Math.floor((max + min) / 2)
        if (target < arr[mid]) {
            max = mid - 1
        } else if (target > arr[mid]) {
            min = mid + 1
        } else {
            return mid
        }
    }
    return -1
}
