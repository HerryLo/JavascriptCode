function eleEvent() {
    $('#phoneNumber, #verCode').bind('input propertychange', function() {
        let val1 = $('#verCode').val()
        let val2 = $('#phoneNumber').val()
        if(val1.length > 0 && val2.length > 0){
            $('.regBtn').addClass('regBtnBg');
        }else{
            $('.regBtn').removeClass('regBtnBg');
        }
    })
}
function main() {
    eleEvent();
}
main();
