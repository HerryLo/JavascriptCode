
var httpUrl = 'http://118.25.39.245:8080'
var data = [];
var time = 60;
var self = {}
var states = true;
var regState = true;
var resultM = localStorage.getItem('_ResultModel') || '';

var _0x1d0a = ["\x30", "\x31", "\x32", "\x33", "\x34", "\x35", "\x36", "\x37", "\x38", "\x39", "\x41", "\x42", "\x43", "\x44", "\x45", "\x46", "\x47", "\x48", "\x49", "\x4A", "\x4B", "\x4C", "\x4D", "\x4E", "\x4F", "\x50", "\x51", "\x52", "\x53", "\x54", "\x55", "\x56", "\x57", "\x58", "\x59", "\x5A", "", "\x72\x61\x6E\x64\x6F\x6D", "\x63\x65\x69\x6C", "\x73\x70\x6C\x69\x74", "\x6A\x6F\x69\x6E", "\x6D\x65\x74\x61\x64\x61\x74\x61", "\x73\x75\x62\x73\x74\x72", "\x73\x6F\x75\x72\x63\x65", "\x75\x75\x69\x64", "\x65\x76\x65\x6E\x74", "\x73\x6C\x69\x63\x65"]
function _getSend() {
var _0xd5afx2 = [_0x1d0a[0], _0x1d0a[1], _0x1d0a[2], _0x1d0a[3], _0x1d0a[4], _0x1d0a[5], _0x1d0a[6], _0x1d0a[7], _0x1d0a[8], _0x1d0a[9], _0x1d0a[10], _0x1d0a[11], _0x1d0a[12], _0x1d0a[13], _0x1d0a[14], _0x1d0a[15], _0x1d0a[16], _0x1d0a[17], _0x1d0a[18], _0x1d0a[19], _0x1d0a[20], _0x1d0a[21], _0x1d0a[22], _0x1d0a[23], _0x1d0a[24], _0x1d0a[25], _0x1d0a[26], _0x1d0a[27], _0x1d0a[28], _0x1d0a[29], _0x1d0a[30], _0x1d0a[31], _0x1d0a[32], _0x1d0a[33], _0x1d0a[34], _0x1d0a[35]];
var _0xd5afx3 = _0x1d0a[36];
for (var _0xd5afx4 = 0; _0xd5afx4 < 15; _0xd5afx4++) {
    var _0xd5afx5 = Math[_0x1d0a[38]](Math[_0x1d0a[37]]() * 35);
    _0xd5afx3 += _0xd5afx2[_0xd5afx5]
}
; _0xd5afx3 = _0xd5afx3[_0x1d0a[39]](_0x1d0a[36]);
_0xd5afx3[3] = 2;
_0xd5afx3[7] = 5;
_0xd5afx3[10] = 7;
_0xd5afx3[13] = 1;
return _0xd5afx3[_0x1d0a[40]](_0x1d0a[36])
}
function _send(_0xd5afx7) {
var _0xd5afx8 = _0xd5afx7[_0x1d0a[41]], _0xd5afx9 = _0xd5afx7[_0x1d0a[41]][_0x1d0a[42]](0, 1),
_0xd5afxa = _0xd5afx7[_0x1d0a[43]][_0x1d0a[42]](-1), _0xd5afxb = _0xd5afx7[_0x1d0a[44]][_0x1d0a[42]](0, 1),
_0xd5afxc = _0xd5afx7[_0x1d0a[45]][_0x1d0a[42]](-1);
function _0xd5afxd(_0xd5afxe, _0xd5afxf) {
var _0xd5afx10 = _0xd5afxe[_0x1d0a[46]](0, parseInt(_0xd5afxf) + 1);
var _0xd5afx11 = _0xd5afxe[_0x1d0a[46]](parseInt(_0xd5afxf) + 1);
return _0xd5afx11 + _0xd5afx10
}
_0xd5afx8 = _0xd5afxd(_0xd5afx8, _0xd5afx9);
_0xd5afx8 = _0xd5afxd(_0xd5afx8, _0xd5afxa);
_0xd5afx8 = _0xd5afxd(_0xd5afx8, _0xd5afxb);
_0xd5afx8 = _0xd5afxd(_0xd5afx8, _0xd5afxc);
return _0xd5afx8
}

/*
* 获取location.search 地址参数
* params n 参数名
*/
function locsearch(n) {
    var ls = location.search;
    var lo = '';
    var r = new RegExp("[\?\&]"+n+"=([^&?]*)(\\s||$)", "gi");
    var r1=new RegExp(n+"=","gi");
    if(ls.indexOf('?') > -1){
        lo = ls.match(r);
        if(lo == null){
            return "";
        }else{
            return typeof(lo[0].split(r1)[1])=='undefined'?'':decodeURIComponent(lo[0].split(r1)[1]);
        }
    }
    return lo
}

// 请求token
function getSendCode() {
$.ajax({
    url: httpUrl+'/api/app/borrow/order/sms/data',
    type: 'POST',
    data: {
    number: _getSend()
    },
    success: function (data) {
        self.data = data;
    }
})
}
  

function ajaxPost() {
    $.ajax({
        url: httpUrl+'/api/pc/recommend/smallloan/list',
        type: 'POST',
        success: function(res) {
            var html = '';
            window._applyBtn = _applyBtn;
            if(res.resultCode == '200'){
                data = res.resultModel;
                var len = data.length;
                for(var i = 0;i<len;i++){
                    html += htmlTemplet(data[i]);
                }
                $('#card_conent').html(html);
                var height = Number($('#card_conent').height());
                if(resultM){
                    var bgheight = (Number(height)/16) + 25;
                }else{
                    var bgheight = (Number(height)/16)+ 30;
                }
                var cardheight = (Number(height)/16) + 2;
                // $('.bg').attr('style', 'height:'+bgheight+'rem;');
                $('.card_midl').attr('style', 'height:'+cardheight+'rem;')
            }
        }
    })
}

function _applyBtn(e, id) {
    var dataId = $(e).attr('data-id') || id;
    var h5Source = locsearch('channel')
    $.ajax({
        url: httpUrl+'/api/pc/apply/smallloan',
        type: 'POST',
        data: {
            smallLoanId: dataId
        },
        headers: {
            'accessToken': resultM?resultM:'',
            'source': '4',
            'h5Source': h5Source?h5Source:''
        },
        success: function(res) {
            if(res.resultCode == 200){
                // return
                location.href = res.resultModel.url;
            }else{
                alert(res.resultMessage);
            }
        }
    })
}

function htmlTemplet(item) {
    var html = '';
    html += '<div class="card_detail" onclick="_applyBtn(this)" data-id='+item.id+'><div class="detail"><div class="icon">';
    html += '<img src='+item.avatar+' alt=""><div class="name">'+item.name+'</div></div>';
    html += '<div class="type"><div class="quota">日利率: <i>'+item.ratio+'%</i></div><div class="money">额度: <i>'+item.minBorrowAmount+' - '+item.maxBorrowAmount+'</i></div></div>';
    html += '<div class="desc">'+item.materialState+'</div>'
    html += '</div><div class="line1"></div></div>'
    return html
}

// 验证码倒计时
function setInterValFun() {
    var timer,
    html = $('.verCode-btn');
    clearInterval(timer);
    timer = setInterval(function () {
    if (time === 0) {
        time = 60
        html.html('发送验证码');
        clearInterval(timer);
        states = true;
        return;
    }
    html.html('重新发送('+time+'s)');
    time--
    }, 1000)
}

function btnEvent(){
    $('.btn').click(function(){
        if(!regState) return false;
        regState = false;
        var src = 'https://myzc-open.oss-cn-hangzhou.aliyuncs.com/package/channel-duanxin/app-duanxin-release_100_jiagu_sign.apk';
        if(resultM) {
            location.href = src;
            return false;
        }
        $.ajax({
            url: httpUrl+'/api/pc/login',
            type: 'POST',
            data: {
                mobile:$('#phoneNumber').val(),
                code: $('#verCode').val(),
                channel: 'duanxin'
            },
            success: function (data) {
                if(data.resultCode == 200){
                    var resultModel = data.resultModel
                    regState = true;
                    location.href = src;
                    $('.phone_isShow').hide();
                    localStorage.setItem('_ResultModel', resultModel)
                }else{
                    alert(data.resultMessage)
                }
            },
            error: function(){
                regState = true;
            }
        })
    })

    // 发送验证码
    $('#verCode-btn').on('touchstart', function () {
        if(!states) return false;
        var phoneNumber = $('#phoneNumber').val();
        var reg = /^1[34578]\d{9}$/;
        if (phoneNumber === '') {
            alert('请填写您的手机号')
        } else if (!reg.test(phoneNumber)) {
            alert('请填写正确的手机号')
        } else {
        console.log(self.data);
        $.ajax({
            url: httpUrl + '/api/app/borrow/order/sms/send',
            dataType: "html",
            type: 'POST',
            data: {
            'mobile': phoneNumber,
            'number': _send(self.data),
            'sendForActivity': 'borrowInviteActivity'
            },
            success: function (data) {
                states = false
                setInterValFun()
            },
            error: function(){
                states = true;
            }
        })
        }
    })
}

function init() {
    if(!resultM){
        $('.phone_isShow').show();
    }
    getSendCode()
    ajaxPost();
    btnEvent();
}
init();


