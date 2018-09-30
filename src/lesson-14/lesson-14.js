import { trafficLight } from './scripts/traffic-lighter';

import './lesson-14.scss';
import { Lighter } from './scripts/lighter';
import { LampController } from './scripts/lamp-controller';

import './scripts/index.jsx';

const lighter1 = new Lighter(document.querySelector('.lighter-1'), 'green');
const lighter2 = new Lighter(document.querySelector('.lighter-2'), 'yellow');
const controller = new LampController(document.querySelector('.container'));
// lighter1.render();
// trafficLight(document.querySelector('#lighter-1'));
// trafficLight(document.querySelector('#lighter-2'));
trafficLight(document.querySelector('.place-for-traffic-light'));

// const xhr = new XMLHttpRequest();

// xhr.open('GET', 'http://localhost:4001/list');

// xhr.send();

// xhr.onreadystatechange = function(){
//     if(xhr.readyState === 4){
//         if(xhr.status ===  200){
//             const list = document.createElement('ul');
//             const data = JSON.parse(xhr.response);

//             for(const item of data){
//                 const li = document.createElement('li');
//                 li.textContent = item.title;
//                 list.appendChild(li);

//             }
//             document.querySelector('body').appendChild(list);
//         }
//         // console.log(xhr);
//     }
// }

