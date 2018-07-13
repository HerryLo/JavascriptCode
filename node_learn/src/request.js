const https = require('https');
const hostname = `www.imooc.com`
const hostpath = `/article/43033`

const options = {
  hostname: hostname,
  port: 443,
  path: hostpath,
  method: 'GET',
  headers: {
    'Cookie': 'UM_distinctid=162f1d130d21ce-03800955807383-336c7b05-13c680-162f1d130d32d1; CNZZDATA1261110065=1500861835-1524473432-https%253A%252F%252Fwww.baidu.com%252F%7C1524473432; imooc_uuid=2a3b905e-ee72-4e57-bd30-1e913806335e; imooc_isnew_ct=1524475442; imooc_isnew=2; IMCDNS=0; PHPSESSID=ppb2ulka03gingrd146go1ool2; loginstate=1; apsid=IwZmM3NTVmNGJlM2E4YmVmNTA2OGFmOWU1MTkxMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDAzNjE0MQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMTY5MTcwMTY1QHFxLmNvbQAAAAAAAAAAAAAAAAAAADY1Y2U0N2NiYWVkZDUwYzU3NDU0Yzg1YTY4YTJlYjcxjW1DW41tQ1s%3DZj; last_login_username=1169170165%40qq.com; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1531364486,1531374595,1531377700,1531393846; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1531364486,1531374595,1531377700,1531393846; Hm_lpvt_fb538fdd5bd62072b6a984ddbc658a16=1531393855; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1531393855; cvde=5b436d5ef259b-605',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
    accept: '*/*',
    'Origin':'https://www.imooc.com',
    'Referer':'https://www.imooc.com/article/43312',
    'Host':'www.imooc.com',
    'Connection':'keep-alive'
  }
};

function httpRequest(options) {
    return new Promise((resolve, reject)=> {
        try{
            const req = https.request(options, (res) => {
                // console.log('状态码：', res.statusCode);
                // console.log('请求头：', res.headers);
                res.on('data', (d) => {
                    resolve(d);
                });
            });
            req.on('error', (e) => {
                console.error(e);
                reject(e)
            });
            req.end();
        }catch(e){
            console.log(e);
        }
    })
}

async function main() {
    for (let i = 0; i < 2; i++) {
        await httpRequest(options).then((d)=> {
            console.log(`请求${hostname}${hostpath}的次数达到${i+1}次`);
        })
    }
}

main();

