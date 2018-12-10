// 归并排序 

let result = [4, 56, 1, 0, 67, 99, 29]

function mergSort(arr) {
    let len = arr.length;

    if(len < 2){
        return arr;
    }

    let mid = Math.floor(len / 2);
    let left = arr.slice(0,mid);
    let right = arr.slice(mid,len);
    return mergeArray(mergSort(left), mergSort(right));//递归分别对左右两部分数组进行排序合并
}

function mergeArray(left, right) {
    let arr = [];

    while(left.length > 0 && right.length > 0){
        if(left[0]<=right[0]){
            //如果左边的数据小于右边的数据，将左边数据取出，放在新数组中
            arr.push(left.shift());
        }else{
            arr.push(right.shift());
        }
    }
        
    while(left.length){
        arr.push(left.shift())
    }

    while(right.length){
        arr.push(right.shift())
    }

    return arr;
}

console.log(mergSort(result))