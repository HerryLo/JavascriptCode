// 归并排序 

let arr = [4, 56, 1, 0, 67, 99, 29]

let len = arr.length;
let first = 0,
    last = len - 1;

function mergSort(arr, first, last) {
    if (first < last) {
        let mid = parseInt((last + first) / 2)
        mergSort(arr, first, mid)
        mergSort(arr, mid + 1, last)

        console.log(first, mid+1, last)
        mergeArray(arr, first, mid, last)
    }
}

function mergeArray(a, first, mid, last) {
    let l = first;
    let r = last;
    let m = mid;
    let temp = [];

    for (let i = l; i <= r; i++) {
        temp[i - l] = a[i];
    }

    let i = l;
    let j = m + 1;
    for (let k = l; k <= r; k++) {
        // console.log(i, m, j, r)
        if (i > m) {
            a[k] = temp[j - l];
            j++;
        } else if (j > r) {
            a[k] = temp[i - l];
            i++;
        } else if (temp[i - l] > temp[j - l]) {
            a[k] = temp[j - l];
            j++;
        } else if (temp[i - l] < temp[j - l]) {
            a[k] = temp[i - l];
            i++;
        }
    }
}

mergSort(arr, first, last)