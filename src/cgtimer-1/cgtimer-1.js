import './cgtimer-1.scss';
import io from 'socket.io-client';
const socket = io('http://p3xx.tk:4000');
console.log(socket);
console.log('init');

// socket.on('connect', onConnect);

// function onConnect() {
//     console.log('connect ' + socket.id);
// }
var response = $.get("https://ipinfo.io", function (response) {
    console.log(response.ip, response.country, response.loc, response);
    // responseLoc = response.loc;
}, "jsonp");


var div = 360 / 60;
var secRadius = 360;
var minRadius = 400;
var hoursRadius = 310;
var hours24Radius = 310;
var countSeconds = 0,
    countMinutes = 0,
    countHours = 0;
for (var i = 45; i <= 104; i += 1) {
    var posY = Math.sin((div * i) * (Math.PI / 180)) * secRadius;
    var posX = Math.cos((div * i) * (Math.PI / -180)) * secRadius;
    $('.seconds').append('<div style="transform: translate(' + posX.toFixed(0) + 'px, ' + posY.toFixed(0) + 'px)" class="sec' + countSeconds + '"' + '>' + '</div>');
    countSeconds++;
}

for (var i = 45; i <= 104; i += 1) {
    var posY = Math.sin((div * i) * (Math.PI / 180)) * minRadius;
    var posX = Math.cos((div * i) * (Math.PI / -180)) * minRadius;
    $('.minutes').append('<div style="transform: translate(' + posX.toFixed(0) + 'px, ' + posY.toFixed(0) + 'px)" class="min' + countMinutes + '"' + '>' + '</div>');
    countMinutes++;
}

for (var i = 10; i <= 21; i += 1) {
    countHours++;
    var posY = Math.sin((div * 5 * i) * (Math.PI / 180)) * hoursRadius;
    var posX = Math.cos((div * 5 * i) * (Math.PI / -180)) * hoursRadius;
    $('.hours').append('<div style="transform: translate(' + posX.toFixed(0) + 'px, ' + posY.toFixed(0) + 'px)" class="hr' + countHours + '"' + '>' + countHours + '</div>');
}
for (var i = 10; i <= 20; i += 1) {
    countHours++;
    var posY = Math.sin((div * 5 * i) * (Math.PI / 180)) * hoursRadius;
    var posX = Math.cos((div * 5 * i) * (Math.PI / -180)) * hoursRadius;
    $('.hours24').append('<div style="transform: translate(' + posX.toFixed(0) + 'px, ' + posY.toFixed(0) + 'px)" class="hr' + countHours + '"' + '>' + countHours + '</div>');
}


socket.on('connect', timesync_module);
var date, hours, minutes, seconds, miliseconds;


function updateClockInterface() {
    if (hours < 13) {
        $('.hours24').css({
            'opacity': '0'
        });
    }
    for (var i = 0; i <= seconds; i++) {
        $('.seconds').find('.sec' + i).addClass('active');
    }
    for (var i = 0; i <= minutes; i++) {
        $('.minutes').find('.min' + i).addClass('active');
    }
    for (var i = 0; i <= hours; i++) {
        $('.hours, .hours24').find('.hr' + i).addClass('active');
    }
}


function timesync_module() {
    socket.on('error', (error) => {
        console.log('error');
    });
    socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
            // the disconnection was initiated by the server, you need to reconnect manually
            console.log('disconnected');
            socket.connect();
        }
        // else the socket will automatically try to reconnect
    });
    socket.on('timeofday', function (newDate) {
        // socket.emit('current time', newDate);

        date = new Date(newDate);
        hours = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
        miliseconds = date.getMilliseconds();

        updateClockInterface();

        $('.current-time').text(moment(newDate).format('HH:mm:ss'));
        $('.rasp-time').text(moment(newDate).format('HH:mm:ss'));

        $('.seconds').find('.sec' + seconds).addClass('active');
        $('.minutes').find('.min' + minutes).addClass('active');
        $('.hours').find('.hr' + hours).addClass('active');
        if (hours == 12 && minutes == 59 && seconds == 59 && miliseconds > 500) {
            $('.hours').find('.active').removeClass('active');
        }
        if (minutes == 59 && seconds == 59 && miliseconds > 500) {
            $('.minutes').find('.active').removeClass('active');
        }
        if (seconds == 59 && miliseconds > 500) {
            $('.seconds').find('.active').removeClass('active');
        }
        console.log('miliseconds -' + miliseconds);

    });

}