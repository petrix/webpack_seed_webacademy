import './diplom.scss';
$(document).ready(function () {
        var responseLoc;
        var response = $.get("https://ipinfo.io", function (response) {
            console.log(response.ip, response.country, response.loc, response);
            responseLoc = response.loc;
        }, "jsonp");
        var regActive = false;
        $('.register').click(function () {
            $('.register-form').addClass('reg-active').animate({
                opacity: 1
            }, 500);
            regActive = true;
        });

        $('.register-form-closebtn').click(function () {
            $('.register-form').animate({
                opacity: 0
            }, 500, function () {
                $('.register-form').removeClass('reg-active');
            });
            regActive = false;
        });


        var mobmenu = false;
        $('.icon-mob-menu').click(function () {
            if (!mobmenu) {
                mobmenu = true;
                $(this).addClass('activated');
                $('body>section').addClass('transparent');
                $('.mob-nav').addClass('opened').animate({
                    opacity: 1,
                    transform: "translateY(0 % )",
                    transition: "opacity 0.5s ease-in-out",
                    transition: "transform 0.5s ease-in-out"
                }, 300, function () {});


            } else {
                mobmenu = false;
                $(this).removeClass('activated');
                $('body>section').removeClass('transparent');
                $('.mob-nav').animate({
                    opacity: 0,
                    transform: "translateY(-70 % )",
                    transition: "opacity 0.5s ease-in-out",
                    transition: "transform 0.5s ease-in-out"
                }, 300, function () {
                    $('.mob-nav').removeClass('opened');
                });
            }
            console.log(mobmenu);
        });
        $(window).on('resize', function () {
            if ($(window).width() > 768) {
                $('.icon-mob-menu').removeClass('activated');
                $('body>section').removeClass('transparent');
                $('.mob-nav').animate({
                    opacity: 0,
                    transform: "translateY(-70 % )",
                    transition: "opacity 0.5s ease-in-out",
                    transition: "transform 0.5s ease-in-out"
                }, 300, function () {
                    $('.mob-nav').removeClass('opened');
                });
                mobmenu = false;
            }
            console.log(mobmenu);
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
    }

);