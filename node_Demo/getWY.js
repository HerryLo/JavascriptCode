/*
* 爬取网易网易云音乐封面
* 记得在当前目录创建 WYIMG文件夹
*/

const fs = require('fs');
const request = require('request');
const path = require('path');
const cheerio = require('cheerio');

function list() {
    return new Promise((resolve, reject)=>{
        request('http://music.163.com/api/playlist/detail?id=3779629' , 
            function(err, res, body){
                resolve(JSON.parse(body));
            })
    })
}

list().then((res)=>{
    const tracks = res.result.tracks;
    [0,1,2,3,4,5,6,7,8,9].map(function( i){
        let item = tracks[i];
        request(item.album.picUrl)
            .pipe(fs.createWriteStream(`./WYIMG/${item.name}封面.jpg`));
        console.log(`${item.name}.jpg 拉取完成`);
    })
})