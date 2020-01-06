/**
 * 多维数组转换为一维数组
 * @param {*} arr 遍历的函数
 * @param {*} list 存储函数
 */
function arrlist(arr, list = []){
    arr.forEach((item)=> {
        if(item instanceof Array){
            list = arrlist(item, list);
        }else {
            list.push(item)
        }
    })

    return list
}

let abcd = arrlist([34,56,67, [12,67], [23,[34, [45], [45]],56]])

console.log(abcd)