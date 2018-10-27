function eleEvent() {
    const download_btn = document.getElementById('download_btn');
    const src = 'https://myzc-open.oss-cn-hangzhou.aliyuncs.com/package/channel-duanxin/app-duanxin-release_100_jiagu_sign.apk';
    
    download_btn.onclick = ()=> {
        location.href = src;
    }
};

function mian() {
    eleEvent();
};

mian();