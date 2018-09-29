import './hw-14.scss';


/////нарисовать login окно

$('button').click(function(){
    // $(this).parent().children('p').toggleClass('active');
    $(this).prev('p').toggleClass('active');
});
$('.on-all').click(function(){
    $(this).parent().parent().children().find('p').addClass('active');
});
$('.off-all').click(function(){
    $(this).parent().parent().children().find('p').removeClass('active');
});