/*
* stream流操作
*/

const fs = require('fs');
const request = require('request');
const path = require('path');

const url = 'https://www.pinghongbao.com/meituanwaimai/1'

request.head(url, function (err, res, body) {
    if(err){
        console.log(err);
    }else{
        const filename = path.join(__dirname ,`./file/hello.js`);
        request(url).pipe(fs.createWriteStream(filename));
        console.log('---------------');
        console.log('拉取成功');
        console.log('---------------');
    }
});