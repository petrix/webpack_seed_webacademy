import './diplom.scss';
$(document).ready(function () {

    $.get("https://ipinfo.io", function (response) {
        console.log(response.ip, response.country, response);
    }, "jsonp");
    var selectorPosition = -200;
    var activeProp = 2;
    $('.carselector-next').click(function () {
        if (activeProp < 8) {
            $('.carselector-timeline').find('.active').removeClass('active').next().addClass('active');
            selectorPosition -= 337;
            $('.carselector-timeline').css('transform', 'translateX(' + selectorPosition + 'px)');
            activeProp += 1;
            $('.carselector-prev').removeClass('disabled');
            if (activeProp == 8) {
                $('.carselector-next').addClass('disabled');
            }
        }
    });
    $('.carselector-prev').click(function () {
        if (activeProp > 1) {
            $('.carselector-timeline').find('.active').removeClass('active').prev().addClass('active');
            selectorPosition += 337;
            $('.carselector-timeline').css('transform', 'translateX(' + selectorPosition + 'px)');
            activeProp -= 1;
            $('.carselector-next').removeClass('disabled');
            if (activeProp == 1) {
                $('.carselector-prev').addClass('disabled');
            }
        }
    });

});