import './hw-8.scss';
var i = 0;
$('.red').click(function () {
    $('.green').slideToggle(300, function () {
        $('.blue').slideToggle(300, function () {
            $('.magenta').slideToggle(300);
        });
    });
});