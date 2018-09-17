import './trafficlight.scss';


///////////////////////////////////////
//////----USING JQUERY METHOD----//////
///////////////////////////////////////

$('.j_color_red').click(function() {
    $('.j_color_red').addClass('j_active');
    $('.j_color_yellow').removeClass('j_active');
    $('.j_color_green').removeClass('j_active');
});
$('.j_color_yellow').click(function() {
    $('.j_color_red').removeClass('j_active');
    $('.j_color_yellow').addClass('j_active');
    $('.j_color_green').removeClass('j_active');
});
$('.j_color_green').click(function() {
    $('.j_color_red').removeClass('j_active');
    $('.j_color_yellow').removeClass('j_active');
    $('.j_color_green').addClass('j_active');
});

////////////////////////////////////////
//////----END OF JQUERY METHOD----//////
////////////////////////////////////////


//////////////////////////////////
//////----CLASSIC METHOD----//////
//////////////////////////////////

// const controls = document.querySelectorAll('.trafficlight');
const redcolor = document.querySelector('.color_red');
const yellowcolor = document.querySelector('.color_yellow');
const greencolor = document.querySelector('.color_green');
const circle = document.querySelectorAll('.circle');
for (let i = 0; i < circle.length; i++) {
    var x = circle[i];
    circle[i].onclick = selectOption;
}

function selectOption() {
    if (this.classList.contains('color_red')) {
        redcolor.classList.add('active');
        yellowcolor.classList.remove('active');
        greencolor.classList.remove('active');
    } else if (this.classList.contains('color_yellow')) {
        redcolor.classList.remove('active');
        yellowcolor.classList.add('active');
        greencolor.classList.remove('active');
    } else if (this.classList.contains('color_green')) {
        redcolor.classList.remove('active');
        yellowcolor.classList.remove('active');
        greencolor.classList.add('active');
    }
}