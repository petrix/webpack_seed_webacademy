import './trafficlight.scss';


///////////////////////////////////////
//////----USING JQUERY METHOD----//////
///////////////////////////////////////

$('.j_circle').click(function() {
    $(this).addClass('j_active');
    $('.j_circle').not(this).removeClass('j_active');
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
// const circle = document.querySelector('.circle');
const circles = document.querySelectorAll('.circle');
for (let i = 0; i < circles.length; i++) {
    var x = circles[i];
    circles[i].onclick = selectOption;
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