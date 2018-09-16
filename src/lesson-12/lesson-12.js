import './lesson-12.scss';

const container = document.querySelector('.select');
const header = document.querySelector('.select__header');
const controls = document.querySelectorAll('.select__control');

for(let i = 0; i< controls.length; i++){
    controls[i].onclick = selectOption;
}

function toggle(){
    if(container.classList.contains('select__opened')){
        close();
    }else{
        open();
    }
}
function close(){
    container.classList.remove('select__opened');
}
function open(){
    container.classList.add('select__opened');
}
header.onclick = toggle;

function selectOption(){
    console.log(this);
    const text = this.textContent;
    header.textContent = text;
    close();
}


// var sum=0;
// var i = 0;
// for (i=0; i<=10; i++){
//     console.log(i);
//     sum += i;
// }
// console.log(sum);


// $('#yyy').click(function(){
//     $('#xxx').toggleClass('select__opened');
// });

