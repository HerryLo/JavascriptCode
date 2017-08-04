### nodejs 使用fs模块读取修改文件内容
```javascript
let fs = require('fs')
let path = require('path')

let baseFilepath = './'

function readDir (path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path, function(err, files) {
      if (err) {
        reject(err)
        return
      }
      resolve(files)
    })
  })
}

//获取后缀名
function getlast(url){
    var arr = url.split('.');
    var len = arr.length;
    return arr[len-1];
}

// 修改文件内容
function changeFile(filepath) {
  fs.readFile(filepath, 'utf-8', 'r+', function(err, data) {
    if (err) {
      console.log(err)
      return
    }
    let finalData = data
    // let regex = new RegExp(/\b\:\s*\d+\.*\d*rem/)
    finalData = finalData.replace('ID'', 'CD')
    fs.writeFile(filepath, finalData, function(err) {
      if (err) {
        throw err;
      }
    })
    //console.log(data)
  })
}

function main (filepath) {
  readDir(filepath).then(files => {
    files.forEach(function(file) {
      fs.stat(path.join(filepath, file), function(err, stat) {
        if (err) {
          console.log(err)
          return
        }
        if (stat.isFile()) {
          // 判断是否是css
          if (getlast(file) == 'css') {
            // 改变内容
            console.log(file)
            changeFile(path.join(filepath, file))
          }
        }
        if (stat.isDirectory()) {
          main(path.join(filepath, file))
        }
      })
    })
  }).catch(err => {
    console.log(err)
    console.trace()
  })
}

main(baseFilepath)

```
