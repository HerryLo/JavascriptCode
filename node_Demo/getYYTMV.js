/*
* 爬取音悦台 MV
*/

const path = require('path');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

let mv_id = 3024609; // mv_id就是后面的数字 http://v.yinyuetai.com/video/h5/3024609

let url = "http://www.yinyuetai.com/insite/get-video-info?flex=true&videoId="+ mv_id;
let timeout = 30;
let headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
}

/* 获取下载文本 */
function requestHtml(){
    let options = {
        url: url,
        headers: headers
    };
    return new Promise((resolve, reject)=> {
        request(options, function(error, response, body){
            if(!error && response.statusCode == 200){
                let info = body;
                resolve(info);
            }
        })
    })
}

/* 下载视频 */
function download(u){
    request.head(u, function(err, res, body){
        if(err){
            console.log(err);
            return false;
        }else{
            request(u)
            .pipe(fs.createWriteStream('./file/曾经我也想过一了百了 现场版 中文字幕.mp4'));
        }
    })
}

requestHtml().then((data)=>{
    let reg = /(ttp):\/\/([\w\-_]+\.yinyuetai.com\/uploads\/videos\/common\/+[\w\-_]+\.mp4\?+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#]))/g
    console.log(data.match(reg));
    let url = data.match(reg);
    if(url instanceof Array){
        let u = url[0].replace('ttp', 'http');
        download(u);
    }
    
})
