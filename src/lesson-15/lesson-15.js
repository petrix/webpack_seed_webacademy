// import { trafficLight } from './scripts/traffic-lighter';

import './lesson-15.scss';

function kotik (name, color){
    this.name = name;
    this.color = color;
    this.props = function greetengs (){
        console.log('kotik ' + name + ' has ' + color + ' color');
        $('.kotik').append().html('<div>kotik ' + name + ' has ' + color + ' color'+'</div><br>');
    }
}

const kotik1 = new kotik ('pushok', 'purple');
const kotik2 = new kotik ('chertenok', 'black');
const kotik3 = new kotik ('zevs', 'orange');

kotik1.props();
kotik2.props();
// kotik3.props();





