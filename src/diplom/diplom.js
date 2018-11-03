import './diplom.scss';
$(document).ready(function () {
    var responseLoc;
    var response = $.get("https://ipinfo.io", function (response) {
        console.log(response.ip, response.country, response.loc, response);
        responseLoc = response.loc;
    }, "jsonp");



    var mobmenu = false;
    $('.icon-mob-menu').click(function () {
        if (!mobmenu) {
            $('.icon-mob-menu').addClass('activated');
            $('nav').addClass('opened').animate({
                opacity: 1,
                transform: "translateY(0 % )",
                transition: "opacity 0.5s ease-in-out",
                transition: "transform 0.5s ease-in-out"
            }, 500, function () {});
            mobmenu = true;


        } else {

            $('.icon-mob-menu').removeClass('activated');
            $('nav').removeClass('opened').animate({
                opacity: 0,
                transform: "translateY(-70 % )",
                transition: "opacity 0.5s ease-in-out",
                transition: "transform 0.5s ease-in-out"
            }, 500, function () {});
            mobmenu = false;

        }
    });
    var selectorPosition = -200;


    // $(window).on('resize', function () {
    //     if ($(window).width() > 768) {
    //         $('.icon-mob-menu').removeClass('activated');
    //         $('nav').removeClass('opened').animate({
    //             opacity: 0
    //         }, 1);
    //         mobmenu = false;
    //         console.log($(window).width());
    //     } else {
    //     }
    // });


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