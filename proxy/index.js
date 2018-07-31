"use strict"

const promise = require('bluebird')
const request = promise.promisifyAll(require('request'))
const { ProxyStart } = require('./proxy')
const { userAgents } = require('./userAgent')

const url = 'https://cnodejs.org/topic/5a3772438230827a18293818';

/**
 * 使用代理IP 请求网页
 */
async function requestNet() {
    try{
        const ipList = await ProxyStart(1);
        const ip = ipList[parseInt(Math.random() * ipList.length)];
        let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
        const options = {
            url: url,
            proxy: ip,
            headers: {
                'User-Agent': userAgent
            }
        }
        console.log(`代理IP: ${ip}`)
        request.get(options, onresponse);
    }catch(e){
      console.log(e);  
    }
}

/**
 * 请求回调函数
 * @param {*} err 
 * @param {*} res 
 */
function onresponse(err, req, body){
    if(err){
        console.log(err)
        return;
    }
    if(body&&req.statusCode===200){
        console.log(req);
    }
}

async function main() {
    for (let i = 0; i < 1; i++) {
        await requestNet()
    }
}

main()