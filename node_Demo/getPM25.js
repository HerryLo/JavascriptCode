/*
* 爬取城市PM2.5
*/

const fs = require('fs');
const request = require('request');
const path = require('path');
const cheerio = require('cheerio');

function getPM25(cityname) {
    const url = 'http://www.pm25.com/'+ cityname+'.html'
    request.head(url, function (err, res, body) {
        if(err){
            console.log(err);
        }else{
            request(url,function  (error,response,data)   {
                if(!error && response.statusCode == 200){
                    const $ = cheerio.load(data);
                    let city = $('.bi_loaction_city');  // 城市名称
                    let aqi = $('.bi_aqiarea_top .bi_aqiarea_num');   // AQI指数
                    let quality = $('.bi_aqiarea_right span') // 空气质量
                    let result = $('div .bi_aqiarea_bottom') // 空气质量描述
                    console.log(city.text() + 'AQI指数:'+ aqi.text() + ';空气质量:' + quality.eq(0).text() + result.text())
                }
            });
        }
    });
}

getPM25('wuhan')