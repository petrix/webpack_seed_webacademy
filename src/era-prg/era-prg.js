import './era-prg.scss';




var int;

$('.circle').on('click', function () {
    clearInterval(int);
    int = setInterval(function () {
        var date = new Date();
        $('.circle').toggleClass('active');
        console.log($('.circle').position(), date);
    }, 1000);

});