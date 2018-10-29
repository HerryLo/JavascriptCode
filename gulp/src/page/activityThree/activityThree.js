let _ResultModelThree = localStorage.getItem('_ResultModel') || '';
if(_ResultModelThree){
    location.href = './activityList.html'
}
clearInterval(window.timerThree);
// <!-- 列表渲染 -->
function activityThreeHtmlFunction () {
    var len = _jsonComment.length;
    var activityThreeHtml = '';
    for(var i = 0;i < len;i++){
        activityThreeHtml += '<div class="list"><div><div class="headUrl" style="background:url('+_jsonComment[i].imgUrl+') no-repeat center center;background-size: 100% 100%;"></div>'+
        '<div class="list_right"><div class="phone_time">'+
        '<div class="phone">'+_jsonComment[i].phone+'</div>'+
        '<div class="time">'+_jsonComment[i].createTime+'</div></div>'+
        '<div class="desc">'+_jsonComment[i].desc+'</div></div></div>'+
        '<div class="footHeight"></div></div>';
    }
    $('.broaDcast_list').html(activityThreeHtml);
}
activityThreeHtmlFunction();

// <!-- 轮播列表 -->
var doscroll = function(){
    var $parent = $('.broaDcast_list');
    var $first = $parent.find('.list:first');
    var height = $first.outerHeight();
    $parent.css({
        'marginTop': -(height) + 'px', 
        'transition': 'margin-top 0.6s linear 0s'
    })
    setTimeout(function(){
        $first.appendTo($parent);
        $parent.css({'marginTop': 0, 'transition': ''})
    }, 1000)
};
var timerThree = setInterval(function(){doscroll()}, 3000);