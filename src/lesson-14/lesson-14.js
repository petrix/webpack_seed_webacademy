import { trafficLight } from './scripts/traffic-lighter';

import './lesson-14.scss';
import { Lighter } from './scripts/lighter';
import { LampController } from './scripts/lamp-controller';
const lighter1 = new Lighter(document.querySelector('.lighter-1'), 'green');
const lighter2 = new Lighter(document.querySelector('.lighter-2'), 'yellow');
const controller = new LampController(document.querySelector('.container'));
// lighter1.render();
// trafficLight(document.querySelector('#lighter-1'));
// trafficLight(document.querySelector('#lighter-2'));
trafficLight(document.querySelector('.place-for-traffic-light'));





