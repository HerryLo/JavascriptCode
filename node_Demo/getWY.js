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
    tracks.map(function(item){
        console.log('name: '+ item.name);
    })
})