let arr = [4, 1, 5, 2, 10, 0, 1, 3, 11]

/**
 * 插入排序
 * @param {*} arr 
 * @param {*} n 
 */
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        let temp = arr[j];
        while(j > 0 && arr[j-1] > temp){
            // if(arr[j-1] > temp){
                arr[j] = arr[j-1];
                j--;
            // }
        }
        arr[j] = temp;
    }
    console.log(arr);
}

insertSort(arr)
