import './diplom.scss';
$(document).ready(function () {
    var responseLoc;
    var response = $.get("https://ipinfo.io", function (response) {
        console.log(response.ip, response.country, response.loc, response);
        responseLoc = response.loc;
    }, "jsonp");


    var mobmenu = false;
    $('.for-mobile').click(function () {
        if (mobmenu) {

            $('nav').removeClass('opened').animate({
                opacity: 0,
                // transform: "scaleY(0%)",
                transform: "translateY(-70 % )",
                transition: "opacity 0.5s ease-in-out",
                transition: "transform 0.5s ease-in-out"
            }, 500, function () {
                // $(this).removeClass('opened');
            });



            // $(this).next().removeClass('opened');
            mobmenu = false;
        } else {
            $('nav').addClass('opened').animate({
                opacity: 1,
                // transform: "scaleY(100%)",
                transform: "translateY(0 % )",
                transition: "opacity 0.5s ease-in-out",
                transition: "transform 0.5s ease-in-out"

            }, 500, function () {
                // $(this).addClass('opened');
            });


            // $(this).next().addClass('opened');
            mobmenu = true;

        }


    });



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