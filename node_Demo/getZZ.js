/*
* 批量下载读者文章
*/

const request= require('request');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const time = '2017_11'
const baseurl = 'http://www.52duzhe.com/'+time+'/';
const firsturl = baseurl + 'index.html';

function requestHtml(url) {
    return new Promise((resolve, reject)=>{
        request(url, function(err, res, body){
            if(!err && res.statusCode == 200){
                resolve(body);
            }
        })
    })
}

function main() {
    requestHtml(firsturl).then((res)=> {
        const $ = cheerio.load(res);
        const list = $('.booklist a');
        list.each(function(a,item){
            const newurl = baseurl+ $(item).attr('href');
            requestHtml(newurl).then((data)=>{
                let content = '';
                const $ = cheerio.load(data);
                let title = $('h1').text();
                let writer = $('#pub_date').text();
                let filename = path.join(__dirname, '/dz/'+title+'.txt');
                content += `<<${title}>>\n\n`;
                content += `${writer}\n\n`;
                let text = $('.blkContainerSblkCon p');
                text.each(function(a, b){
                    content += $(b).text();
                })
                fs.writeFile(filename, content, function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(filename+'创建成功');
                    }
                })
            })
        })
    })
}

main();