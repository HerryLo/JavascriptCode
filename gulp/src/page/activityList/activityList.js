const httpUrl = 'http://118.31.57.147:8080'
const resultM = localStorage.getItem('_ResultModel') || '';
/**
 * 请求数据
 * @param {*} option 
 */
function requestData(option) {
    var { url, type,  params, header} = option
    $.ajax({
        url: httpUrl+url,
        type: 'POST',
        data: params?params:{},
        headers: header?header:{},
        success: function (res) {
            var data = res;
            console.log(data);
            if(data.resultCode == 200){
                option.fn && option.fn(data);
            }else{
                alert(data.resultMessage)
            }
            return;
        }
    })
}

function domHtmlList(data) {
    let html = '';
    let len = data.resultModel.length;
    for(let i=0;i<len;i++){
        let item = data.resultModel[i];
        html += '<div class="item_list"><div class="item_list_1">'+
        '<img src='+item.avatar+' alt="">'+
        '<div class="title_desc"><div class="title">'+item.name+'</div>'+
        '<div class="desc"><a>'+item.applyNum+'</a>人申请成功</div></div></div>'+
        '<div class="item_list_2"><div>最高额度：<a>'+item.maxBorrowAmount+'</a></div>'+
        '<div>下款时间：<a>'+item.sendMoneyTime+'</a></div></div>'+
        '<div class="item_list_3">新用户注册享受30天免息</div>'+
        '<div class="item_list_4">'+
        '<a class="item_list_4_Btn" data-id='+item.id+'>立即申请</a>'+
        '</div></div>'
    }
    $('.list_content').html(html);
    $('.item_list_4_Btn').click((event)=> {
        event.stopPropagation()
        const id = $(event.target).attr('data-id');
        requestData({
            url : '/api/pc/apply/smallloan',
            type: 'list',
            params: {
                smallLoanId: id
            },
            header: {
                'access-token': resultM?resultM:''
            },
            fn: function(data) {
                console.log(data)
                location.href = data.resultModel.url;
            }
        });
    })
    return;
}

function listHtmlCard(data) {
    let html = '';
    let len = data.resultModel.length;
    for(let i=0;i<len;i++){
        let item = data.resultModel[i];
        html += '<div class="wrap_contentItem" data-id='+item.id+'>'+
        '<img data-id='+item.id+' src="'+item.avatar+'" alt="">'+
        '<div class="bankName">'+item.name+'</div>'+
        '<div class="number"><a>'+item.applyNum+'</a>人申请成功</div></div>'
    }
    $('.wrap_content').html(html);
    $('.wrap_contentItem img').click((event)=> {
        event.stopPropagation()
        const id = $(event.target).attr('data-id');
        console.log(id);
        requestData({
            url : '/api/pc/apply/smallloan',
            type: 'list',
            params: {
                smallLoanId: id
            },
            header: {
                'access-token': resultM?resultM:''
            },
            fn: function(data) {
                console.log(data)
                location.href = data.resultModel.url;
            }
        });
    })
    return;
}

function main() {
    // 列表
    requestData({
        url : '/api/pc/recommend/smallloan/list',
        type: 'list',
        fn: domHtmlList
    });
    // 列表卡片
    requestData({
        url: '/api/pc/recommend/smallloan/list', 
        type: 'listCard',
        params: {
            hot: '-1'
        },
        fn: listHtmlCard
    });
    return;
};
main()
