import './cgtimer-1.scss';
import io from 'socket.io-client';
var moment = require('./js/moment-with-locales.js');
const socket = io('http://p3xx.tk:4000');
console.log(socket);
console.log('init');


socket.on('refresh', function (refresher) {
    console.log(refresher);
    if (refresher == 1) {
        location.reload();
    }
});
socket.emit('brightness-get', true);
socket.on('brightness value', function (brightnessValue) {
    $('body').css('filter', 'brightness(' + brightnessValue + '%)');
});

// socket.on('connect', onConnect);

// function onConnect() {
//     console.log('connect ' + socket.id);
// }
var response = $.get("https://ipinfo.io", function (response) {
    console.log(response.ip, response.country, response.loc, response);
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
    $('.minutes').append('<div style="transform: translate(' + posX.toFixed(0) + 'px, ' + posY.toFixed(0) + 'px)" class="min' + countMinutes + '"' + '>' + countMinutes + '</div>');
    countMinutes++;
}

for (var i = 9; i <= 20; i += 1) {

    var posY = Math.sin((div * 5 * i) * (Math.PI / 180)) * hoursRadius;
    var posX = Math.cos((div * 5 * i) * (Math.PI / -180)) * hoursRadius;
    $('.hours').append('<div style="transform: translate(' + posX.toFixed(0) + 'px, ' + posY.toFixed(0) + 'px)" class="hr' + countHours + '"' + '>' + countHours + '</div>');
    countHours++;
}

for (var i = 9; i <= 20; i += 1) {

    var posY = Math.sin((div * 5 * i) * (Math.PI / 180)) * hoursRadius;
    var posX = Math.cos((div * 5 * i) * (Math.PI / -180)) * hoursRadius;
    $('.hours24').append('<div style="transform: translate(' + posX.toFixed(0) + 'px, ' + posY.toFixed(0) + 'px)" class="hr' + countHours + '"' + '>' + countHours + '</div>');
    countHours++;
}
// $('.hours24').append('<div style="transform: translate(0px, -310px)" class="hr0">0</div>');

socket.on('error', (error) => {
    console.log('error');
    location.reload();
});
socket.on('disconnect', (reason) => {
    if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        console.log('disconnected');
        location.reload();
        socket.connect();
    }
    // else the socket will automatically try to reconnect
});



socket.on('connect', timesync_module);
var date, hours, minutes, seconds, miliseconds;


function updateClockInterface() {

    for (var i = 0; i <= seconds; i++) {
        $('.seconds').find('.sec' + i).addClass('seconds-active');
    }
    for (var i = 0; i <= minutes; i++) {
        $('.minutes').find('.min' + i).addClass('minutes-active');
    }
}


function timesync_module() {

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

        $('.seconds').find('.sec' + seconds).addClass('seconds-active');
        $('.minutes').find('.min' + minutes).addClass('minutes-active');
        $('.hours').find('.hr' + hours).addClass('hours-active');
        $('.hours24').find('.hr' + hours).addClass('hours-active');

        // console.log(hours);
        if (hours > 11) {
            $('.hours').css({
                'opacity': '0'
            });
            $('.hours24').css({
                'opacity': '1'
            });
        } else {
            $('.hours').css({
                'opacity': '1'
            });
            $('.hours24').css({
                'opacity': '0'
            });
        }
        if (minutes >= 59 && seconds >= 59 && miliseconds > 500) {
            $('.hours').children().removeClass('hours-active');
            $('.hours24').children().removeClass('hours-active');
            $('.minutes').children().removeClass('minutes-active');
            $('.hours').children().removeClass('hours-active');
        }
        if (seconds >= 59 && miliseconds > 500) {
            $('.seconds').children().removeClass('seconds-active');
        }
        // console.log('seconds - ' + seconds + ' - miliseconds - ' + miliseconds);

    });

}
// $('div').click(function () {
//     console.log($(this));
// })