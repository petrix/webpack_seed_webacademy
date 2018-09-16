import './trafficlight.scss';


// const controls = document.querySelectorAll('.circle');
// const circleRed = document.querySelectorAll('.circle_red');
// const circleYellow = document.querySelectorAll('.circle_yellow');
// const circleGreen = document.querySelectorAll('.circle_green');

$('.circle').click(function(){
    if($('.circle').hasClass('circle_red'){
      $('.circle').addClass('trafficlight__red');  
    })
    
})








// for(let i = 0; i< controls.length; i++){
//     controls[i].onclick = selectOption;
// }
// function toggle(){
//     if(controls.classList.contains('circle_red')){
//         trafficlightRed();
//     }else{
//         // open();
//     }
// }
// function trafficlightRed(){
//     controls.classList.add('trafficlight__red');
// }
// // function open(){
// //     // container.classList.add('select__opened');
// // }
// function selectOption(){
//     console.log(this);
//     const text = this.textContent;
// }    
//     // header.textContent = text;
//     // close();

// header.onclick = toggle;