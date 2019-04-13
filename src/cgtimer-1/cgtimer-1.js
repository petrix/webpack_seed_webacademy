import './cgtimer-1.scss';
// import io from 'socket.io-client';
var io = require('socket.io-client');
var moment = require('moment');


// socket.on('connect', onConnect);
$(document).on("contextmenu", function () {
    return false;
});

var div = 360 / 60;
var secRadius = 500;
var minRadius = 560;
var hoursRadius = 430;
// var hours24Radius = 430;

function drawClock() {

    var countSeconds = 0,
        countMinutes = 0,
        countHours = 0;
    for (var i = 45; i <= 104; i += 1) {
        var angle = (i - 45) * 6;
        var posY = Math.sin((div * i) * (Math.PI / 180)) * secRadius;
        var posX = Math.cos((div * i) * (Math.PI / -180)) * secRadius;
        $('.seconds').append('<div style="transform: translate(' + posX.toFixed(0) + 'px, ' + posY.toFixed(0) + 'px) rotate(' + angle + 'deg)" class="sec' + countSeconds + '"' + '>' + '</div>');
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
}
drawClock();
// socket.on('connect', authentificate);

// const socket = io('http://p3xx.tk:4000');
// console.log(socket);
// console.log('init');
// socket.on('error', (error) => {
//     console.log('error');
// });
function updateClockInterface() {

    for (var i = 0; i <= seconds; i++) {
        $('.seconds').find('.sec' + i).addClass('seconds-active');
    }
    for (var i = 0; i <= minutes; i++) {
        $('.minutes').find('.min' + i).addClass('minutes-active');
    }
}

var socket = io.connect('https://p3xx.tk:4001', {
    secure: true,
    reconnect: true,
    rejectUnauthorized: false
});


socket.on('connect', timesync_module);
var date, hours, minutes, seconds, miliseconds;


socket.on('disconnect', (reason) => {
    if (reason === 'io server disconnect') {
        console.log('disconnected');
        socket.connect();
    }
});




function timesync_module() {

    socket.emit('brightness-get', true);
    socket.on('brightness value', function (brightnessValue) {
        $('.wall-body').css({
            'filter': 'brightness(' + brightnessValue + '%)'
        });
    });

    socket.on('timeofday', function (newDate) {
        // socket.emit('current time', newDate);
        console.log(newDate);
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

        var timerHeight = $(window).height();
        var timerWidth = $(window).width();
        timerHeight = timerHeight / 2;
        console.log(timerWidth, timerHeight);
        var translateY = timerHeight - timerHeight / 14;
        var scaleX = timerHeight / 600;
        var translateX = (translateY / 2) * (scaleX + 1);
        $('.timer-module').css({
            transform: 'translate(' + translateY + 'px, ' + translateY + 'px) scale(' + scaleX + ')'
        });
        $('.right-column').css({
            transform: 'translateX(' + (translateY * 2.2) + 'px)'
        });
    });
    var dataClasses = ['active', 'warning', 'danger'];
    var dataDuration;
    socket.on('cg countdown active', function (ccgData) {
        if (ccgData != 'playing') {
            dataClasses.forEach(function (item) {
                $('.vtcountdown').removeClass(item);
            });
        }
    });
    socket.on('countdown', function (dirDuration, dirActive) {
        dataDuration = (dirDuration).toFixed(0);
        dataClasses.forEach(function (item) {
            $('.dircountdown').removeClass(item);
            $('.dircountdown-advanced').removeClass(item);
        });
        if (dirActive) {
            if (dataDuration > 20) {
                dataClasses.forEach(function (item) {
                    $('.dircountdown').removeClass(item);
                    $('.dircountdown-advanced').removeClass(item);

                });
                $('.dircountdown').addClass('active');
                $('.dircountdown-advanced').addClass('active');

            } else if (dataDuration > 10) {
                dataClasses.forEach(function (item) {
                    $('.dircountdown').removeClass(item);
                    $('.dircountdown-advanced').removeClass(item);

                });
                $('.dircountdown').addClass('warning');
                $('.dircountdown-advanced').addClass('warning');
            } else if (dataDuration > 0) {
                dataClasses.forEach(function (item) {
                    $('.dircountdown').removeClass(item);
                    $('.dircountdown-advanced').removeClass(item);

                });
                $('.dircountdown').addClass('danger');
                $('.dircountdown-advanced').addClass('danger');

            } else {
                dataClasses.forEach(function (item) {
                    $('.dircountdown').removeClass(item);
                    $('.dircountdown-advanced').removeClass(item);
                });
            }
        } else {}
        (dataDuration > 0) ? hours = Math.floor(dataDuration / 3600): hours = Math.abs(Math.ceil(dataDuration / 3600));
        (dataDuration > 0) ? minutes = Math.floor((dataDuration - hours * 3600) / 60): minutes = Math.abs(Math.ceil((dataDuration - hours * 3600) / 60));
        (dataDuration > 0) ? seconds = dataDuration - (minutes * 60 + hours * 3600): seconds = Math.abs(dataDuration - (minutes * 60 + hours * 3600));
        seconds = Math.floor(seconds);
        hours = ((hours < 10 && hours >= 0) ? "0" : "") + hours;
        minutes = ((minutes < 10 && minutes >= 0) ? "0" : "") + minutes;
        if (dataDuration < 0) {
            hours = "-" + hours
        }
        seconds = ((seconds < 10 && seconds >= 0) ? "0" : "") + seconds;

        $('.dircountdown-digits').text(hours + ':' + minutes + ':' + seconds);
    });
    socket.on('cg countdown timeData', function (time, totalTime) {
        time = time.toFixed(0);
        var procentTime = ((time * 100) / totalTime);
        $('.vtcountdown-progress-success').css('width', procentTime.toFixed(0) + '%');
        var vtHours = Math.floor(time / 3600);
        var vtMinutes = Math.floor((time - vtHours * 3600) / 60);
        var vtSeconds = time - (vtMinutes * 60 + vtHours * 3600);
        vtSeconds = Math.floor(vtSeconds);
        vtHours = (vtHours < 10 ? "0" : "") + vtHours;
        vtMinutes = (vtMinutes < 10 ? "0" : "") + vtMinutes;
        vtSeconds = (vtSeconds < 10 ? "0" : "") + vtSeconds;
        $('.vtcountdown-digits').text(vtHours + ':' + vtMinutes + ':' + vtSeconds);
        // console.log(time);
        if (time > 20) {
            dataClasses.forEach(function (item) {
                $('.vtcountdown').removeClass(item);
            });
            $('.vtcountdown').addClass('active');
        }
        if (time < 20 && time > 10) {
            dataClasses.forEach(function (item) {
                $('.vtcountdown').removeClass(item);
            });
            $('.vtcountdown').addClass('warning');
        }
        if (time < 10) {
            dataClasses.forEach(function (item) {
                $('.vtcountdown').removeClass(item);
            });
            $('.vtcountdown').addClass('danger');
        }
        if (time <= 0) {
            dataClasses.forEach(function (item) {
                $('.vtcountdown').removeClass(item);
            });


        }
    });
    var ccgPathLength = 35;
    socket.on('cg countdown path', function (path) {
        $(window).resize(function () {});
        var ccgWidth = $('.vtcountdown').width();

        ccgPathLength = Math.floor(ccgWidth / 22);
        // console.log(ccgPathLength);
        var ccgPath = path.split("/").pop().replace(".mov", "").replace(".mp4", "").replace(".avi", "");
        if (ccgPath.length > ccgPathLength) {
            ccgPath = ccgPath.substr(0, ccgPathLength - 3) + "...";
        }
        $('.vtcountdown-label').text(ccgPath);
    });

    ////////////////----CCG OUTDATA
    socket.on('cg countdown outdata', function (outTime) {
        // console.log(outTime);
        var mTime = moment.unix(outTime).format('HH:mm:ss');
        $('.vtouttime-digits').text(mTime);
    });
    // ////////////////----CCG OUTDATA

    socket.on('cg volume 1ch', function (volLeftCh) {
        $('.vtcountdown-progress-au1').css('width', (90 + volLeftCh).toFixed(1) + "%");
    });
    socket.on('cg volume 2ch', function (volRightCh) {
        $('.vtcountdown-progress-au2').css('width', (90 + volRightCh).toFixed(1) + "%");
    });
}