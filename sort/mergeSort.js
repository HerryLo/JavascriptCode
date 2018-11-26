
// 归并排序 

let arr = [4, 56, 1, 0, 67, 99, 29]

let len = arr.length;
let first = 0, last = len - 1;

function mergSort(arr, first, last) {
    let temp = [];
    if(first < last){
        let mid = Math.floor((first+last)/2)
        mergSort(arr, first, mid)
        mergSort(arr, mid+1, last)
        // if(arr[]){
            mergeArray(arr, first, mid, last, temp)
        // }
    }
}

function mergeArray(arr, first, mid, last, temp) {
    let i = first, j = mid + 1;  
    let m = mid,   n = last;  
    let k = 0;3
    

    while (i <= m && j <= n)  
    {  
        if (a[i] <= a[j])  
            temp[k++] = a[i++];  
        else  
            temp[k++] = a[j++];  
    }  
  
    while (i <= m){
        temp[k++] = a[i++];  
    }
  
    while (j <= n){
        temp[k++] = a[j++];
    }
}

mergSort(arr, first, last)
