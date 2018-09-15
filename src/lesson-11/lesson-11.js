import './lesson-11.scss';

const adminName = 'admin';
const adminPass = '111';
// Document object module
const btnSubmit = document.querySelector('#submit-btn');
const inputName = document.querySelector('#name');
const inputPassword = document.querySelector('#password');
const outputElement = document.querySelector('#output');

// console.log(btnSubmit);

function showMessage(){
    const username = inputName.value;
    const password = inputPassword.value;
    if (username === adminName && adminPass === password){
        console.log('Hello Admin');
        outputElement.classList.remove('output-notadmin');
        outputElement.classList.add('output-admin');
        outputElement.textContent = 'Hello Admin';
    } else {

        outputElement.classList.remove('output-admin');
        outputElement.classList.add('output-notadmin');
        console.log('You are not admin');
        outputElement.textContent = 'You are not admin';
    }
        inputName.value = '';
        inputPassword.value = '';


    //console.log('btnSubmit = ', btnSubmit);
    //console.log('username = ', inputName.value);
    //console.log('userpassword = ', inputPassword.value);
    //console.log('Hello! My name is', inputName.value + ', and my password is', inputPassword.value);
}

btnSubmit.onclick = showMessage;


// showMessage();
// showMessage();
// showMessage();