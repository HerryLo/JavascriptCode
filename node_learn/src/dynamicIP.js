const request = require('superagent');
require('superagent-proxy')(request)

const uri = 'https://cnodejs.org/topic/5a3772438230827a18293818';
var proxy = process.env.http_proxy || 'http://168.63.43.102:3128';

function requestNet() {
    // let ip = await getProxyIp()
    let ip = 'http://183.33.128.127'
    request
    .get(uri)
    // .proxy(ip)
    .end(onresponse);
}

async function getProxyIp() {
    let ipsJson = (await request.get('http://api.pcdaili.com/?orderid=888888888&num=100&protocol=1&method=1&an_ha=1&sp1=1&sp2=1&format=json&sep=1')).body
    console.log(1231);
    let isRequestSuccess = false;
    let ips = null
    if (ipsJson && ipsJson.data.proxy_list) {
      ips = ipsJson.data.proxy_list
      isRequestSuccess = true;
    } else {
      ips = ['http://127.0.0.1']
    }
    return ips[parseInt(Math.random() * ips.length)]
}

function onresponse(err, res){
    if(err){
        console.log(err)
        return ;
    }
    // console.log(res.status, res.headers);
    console.log(res);
}

requestNet()