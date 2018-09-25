import './hw-12-2.scss';


$(".row-title").click(function () {
    $(".row-content").not($(this).next()).slideUp(500);
    $(this).next().slideDown(500);
    $(".row-arrow").not($(this).next()).removeClass('row-arrow-active');
    $(this).children().next().addClass('row-arrow-active');
    
    $('.row-title').not($(this)).removeClass('row-active');
    $(this).addClass('row-active');
});

