import './lesson-9.scss';

const openedClassName = 'global-nav_opened';
let isOpened = false;
const btnToggle = document.querySelector('#globalnav-icon');
const nav = document.querySelector('#global-nav');

// console.log(btnSubmit);

function toggle(){
    console.log('Hello World');
    if (isOpened){
        nav.classList.remove(openedClassName);
        isOpened = false;
    } else {
        nav.classList.add(openedClassName);
        isOpened = true;
    }
}

btnToggle.onclick = toggle;







// $(function(){
//     $('#globalnav-icon').click(function() {
//         $('#global-nav').toggleClass('global-nav_opened')
//     })
// });
