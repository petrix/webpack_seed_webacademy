import './hw-14.scss';
$(document).ready(function(){
    

    $.get("https://ipinfo.io", function(response) {
        console.log(response.ip, response.country);
      }, "jsonp")

/////нарисовать login окно

$('button').click(function(){
    $(this).prev('p').toggleClass('active');
});
$('.on-all').click(function(){
    $(this).parent().parent().children().find('p').addClass('active');
});
$('.off-all').click(function(){
    $(this).parent().parent().children().find('p').removeClass('active');
});



});