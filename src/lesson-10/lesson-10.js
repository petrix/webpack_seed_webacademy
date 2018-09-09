import './lesson-10.scss';

var firstName = 'Vasia';
var secondName = 'Pupkin';
var age = 27;

var user = {
    firstName: prompt('Enter your name', ''),
    secondName: prompt('Enter second name', ''),
    age: prompt('Enter edge', '')
}

// var user = {
//     firstName: 'Vasia',
//     secondName: 'Pupkin',
//     age: 27
// }

console.log(user.firstName + ' ' + user.secondName + ' ' + user.age);
console.log(user);

$('.main').css('background-color', '#000');
