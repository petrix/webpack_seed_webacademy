import './hw-8.scss';

var response = $.get("https://ipinfo.io", function (response) {
    console.log(response.ip, response.country, response.loc, response);
    // responseLoc = response.loc;
}, "jsonp");


var div = 360 / 60;
var secRadius = 400;
var minRadius = 350;
var hourRadius = 250;
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

for (var i = 9; i <= 20; i += 1) {
    var posY = Math.sin((div * 5 * i) * (Math.PI / 180)) * hourRadius;
    var posX = Math.cos((div * 5 * i) * (Math.PI / -180)) * hourRadius;
    $('.hours').append('<div style="transform: translate(' + posX.toFixed(0) + 'px, ' + posY.toFixed(0) + 'px)" class="hr' + countHours + '"' + '>' + '</div>');
    countHours++;
}
var date, hours, minutes, seconds, miliseconds;

function updateCurrentTime() {
    date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    miliseconds = date.getMilliseconds();
}
updateCurrentTime();

function updateClockInterface() {
    for (var i = 0; i <= seconds; i++) {
        $('.seconds').find('.sec' + i).addClass('active');
    }
    for (var i = 0; i <= minutes; i++) {
        $('.minutes').find('.min' + i).addClass('active');
    }
    for (var i = 0; i <= hours; i++) {
        $('.hours').find('.hr' + i).addClass('active');
    }
}
updateClockInterface();



var toggleTimer = setInterval(function () {
    updateCurrentTime();
    var momentDate = moment(date).locale('ru').format('LTS');
    console.log(momentDate);
    $('.current-time').html(momentDate);


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
}, 500);




// $('.red').click(function () {

// });
//