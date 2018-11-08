let _httpUrl =  window._httpUrl 
clearInterval(window.timerThree);
// <!-- 列表渲染 -->
function activityThreeHtmlFunction () {
    $.ajax({
        url: _httpUrl+'/api/pc/get/activity/user/data',
        type: 'POST',
        success(res){
            if(res.resultCode == 200){
                let data = res.resultModel;
                let activityThreeHtml = '';
                for(let i = 0;i < data.length;i++){
                    let item = data[i];
                    activityThreeHtml += '<div class="name">'+item+'</div>';
                }
                $('.content').html(activityThreeHtml);
            }
        }
    })
}
activityThreeHtmlFunction();

// <!-- 轮播列表 -->
var doscroll = function(){
    var $parent = $('.content');
    var $first = $parent.find('.name:first');
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