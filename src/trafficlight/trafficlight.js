import './trafficlight.scss';


///////////////////////////////////////
//////----USING JQUERY METHOD----//////
///////////////////////////////////////

// $('.color_red').click(function() {
//     $('.color_red').addClass('active');
//     $('.color_yellow').removeClass('active');
//     $('.color_green').removeClass('active');
// });
// $('.color_yellow').click(function() {
//     $('.color_red').removeClass('active');
//     $('.color_yellow').addClass('active');
//     $('.color_green').removeClass('active');
// });
// $('.color_green').click(function() {
//     $('.color_red').removeClass('active');
//     $('.color_yellow').removeClass('active');
//     $('.color_green').addClass('active');
// });

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
    circle[i].onclick = selectOption;
    console.log(circle[i]);
}

function selectOption() {
    // console.log(this);
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