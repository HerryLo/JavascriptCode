var _jsonComment  = (function() {
    var date = new Date();
    var year = date.getFullYear();
    var mother = date.getMonth()+1;
    var day = date.getDate();
    if(day > 3) {
        day-=3
    }
    mother = Number(mother) > 10?mother:0+mother;
    var nowData = year+'.'+mother+'.'+day
    var url = './img/imgIcon/'
    var jsonComment = [{
        phone: '189****0979',
        createTime: nowData,
        desc: '非常不错', 
        imgUrl: url + 't01a682b8b83a90f9b7.jpg'
    },{
        phone: '156****1590',
        createTime: nowData,
        desc: '给力', 
        imgUrl: url + 't01b2898bdc123edbe0.jpg'
    },{
        phone: '136****8362',
        createTime: nowData,
        desc: '好平台，办事效率很高，下次还来这里借钱', 
        imgUrl: url + 't01dc8f59a4601a5821.jpg'
    },{
        phone: '176****8621',
        createTime: nowData,
        desc: '还不错，成功申请了好几家', 
        imgUrl: url + 't01ec93763bff2d1269.jpg'
    },{
        phone: '135****8868',
        createTime: nowData,
        desc: '很好用的借款平台', 
        imgUrl: url + 't01f0bbd1286c5b67d5.jpg'
    },{
        phone: '135****5051',
        createTime: nowData,
        desc: '好用，好用，资金周转的好伙伴', 
        imgUrl: url + 't01fed4c90bb42789a0.jpg'
    },{
        phone: '138****8855',
        createTime: nowData,
        desc: '很好啊，立马借到了5000', 
        imgUrl: url + 't010d5eb4a53df11e07.jpg'
    },{
        phone: '186****8253',
        createTime: nowData,
        desc: '挺好！简单方便，没广告，没想到借钱这么容易', 
        imgUrl: url + 't011ad6d3c0489e39f7.jpg'
    },{
        phone: '189****7439',
        createTime: nowData,
        desc: '方便又好用，这家借款APP很好用，是我用过放款速度最快的一家', 
        imgUrl: url + 't011cd57652e4c90725.jpg'
    },{
        phone: '157****1143',
        createTime: nowData,
        desc: '下款挺快的，不到十分钟就下款了。',
        imgUrl: url +  't013deea50c892c7f84.jpg'
    },{
        phone: '186****2376',
        createTime: nowData,
        desc: '很牛逼的平台啊，这么多口子', 
        imgUrl: url + 't014a3c73902371be29.jpg'
    },{
        phone: '135****2361',
        createTime: nowData,
        desc: '很不错的，撸了好几个口子，下了两三个',
        imgUrl: url +  't015c15cdb3096fb0f6.jpg'
    },{
        phone: '189****5289',
        createTime: nowData,
        desc: '试试看，真的借到钱了，棒棒棒', 
        imgUrl: url + 't0114b4ab8e30c31436.jpg'
    },{
        phone: '178****2276',
        createTime: nowData,
        desc: '比其他平台好多了', 
        imgUrl: url + 't0183c138d9e3e0732d.jpg'
    },{
        phone: '156****8823',
        createTime: nowData,
        desc: '非常好', 
        imgUrl: url + 't01438edcea854c87c9.jpg'
    },{
        phone: '153****6253',
        createTime: nowData,
        desc: '借到钱了，特意来评论下 哈哈', 
        imgUrl: url + 't0120203ee531dda905.jpg'
    }]
    return jsonComment
})()