import './hw-14.scss';


/////нарисовать login окно

$('button').click(function(){
    $(this).parent().children('p').toggleClass('active');
});
$('.on-all').click(function(){
    $(this).parent().children().find('p').addClass('active');
});