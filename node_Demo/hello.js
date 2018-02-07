const path = require('path');
const fs = require('fs');
const https = require('https');

const cheerio = require('cheerio');
const request = require('request');
const url = 'https://www.pinghongbao.com/meituanwaimai/1'

let req = https.get(url, (res)=> {
    let data = '';
    res.setEncoding('utf8');
    
    res.on('data', (chunk) => {
        data += chunk
    });

    res.on('end', () => {
        const filename = path.join(__dirname, './file/hello.html');
        const $ = cheerio.load(data);
        fs.writeFile(filename, data, function(err){
            if(err) console.log('写文件操作失败');
            else console.log('写文件操作成功');
        });
        /*console.log(`响应主体: ${chunk}`);*/
        console.log('------------------------------------------')
    });
})

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

req.end();