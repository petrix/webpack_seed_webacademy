import './cgtimer-2.scss';
import io from 'socket.io-client';
var moment = require('./js/moment-with-locales.js');
var notifyUser = require('./js/notifications.js');
require('./js/jquery.gesture.password.js');

$("#gesturepwd").GesturePasswd({
    backgroundColor: "#2980B9", //背景色
    color: "#FFFFFF", //主要的控件颜色
    roundRadii: 50, //大圆点的半径
    pointRadii: 12, //大圆点被选中时显示的圆心的半径
    space: 60, //大圆点之间的间隙
    width: 480, //整个组件的宽度
    height: 480, //整个组件的高度
    lineColor: "#ECF0F1", //用户划出线条的颜色
    zindex: 100 //整个组件的css z-index属性
});
$("#gesturepwd").on("hasPasswd", function (e, passwd) {
    var result;

    if (passwd == "1235789") {

        result = true;
    } else {
        result = false;
    }



    if (result == true) {
        $("#gesturepwd").trigger("passwdRight");
        setTimeout(function () {

            //密码验证正确后的其他操作，打开新的页面等。。。
            alert("Pattern is correct")
        }, 500); //延迟半秒以照顾视觉效果
    } else {
        $("#gesturepwd").trigger("passwdWrong");

        //密码验证错误后的其他操作。。。

    }
});



moment.locale('uk');
var message;
var windowWidth;
var ccgPathLength = 35;
var ovner = 'CameraMan';

$(document).ready(function () {

    var socket = io('http://p3xx.tk:4000');
    var response = $.get("https://ipinfo.io", function (response) {
        console.log(response.ip, response.country, response.loc, response);
    }, "jsonp");




    $("select").change(function () {
        var str;
        $("select option:selected").each(function () {
            str = $(this).text();
        });
        console.log(str);
        ovner = str;
    }).trigger("change");
    $('.login').click(function () {
        $('.login-window').remove();
    });





    socket.on('connect', dir_module);
    var date, hours, minutes, seconds, miliseconds;

    function dir_module() {
        // socket.on('error', (error) => {
        //     console.log('error');
        // });
        // socket.on('disconnect', (reason) => {
        //     if (reason === 'io server disconnect') {
        //         console.log('disconnected');
        //         socket.connect();
        //     }
        // });

        socket.on('timeofday', function (currentTime) {
            $('.current-time-digits').text(moment(currentTime).format('HH:mm:ss'));

        });
        var dataClasses = ['active', 'warning', 'danger'];
        var dataDuration;
        socket.emit('countdown-get', true);
        socket.on('countdown', function (dirDuration, dirActive) {
            dataDuration = (dirDuration).toFixed(0);
            dataClasses.forEach(function (item) {
                $('.dircountdown').removeClass(item);
            });
            if (dirActive) {
                if (dataDuration > 20) {
                    setPlayedButtons();
                    dataClasses.forEach(function (item) {
                        $('.dircountdown').removeClass(item);
                    });
                    $('.dircountdown').addClass('active');
                } else if (dataDuration > 10) {
                    setPlayedButtons();
                    dataClasses.forEach(function (item) {
                        $('.dircountdown').removeClass(item);
                    });
                    $('.dircountdown').addClass('warning');
                } else if (dataDuration > 0) {
                    setPlayedButtons();
                    dataClasses.forEach(function (item) {
                        $('.dircountdown').removeClass(item);
                    });
                    $('.dircountdown').addClass('danger');
                } else {
                    dataClasses.forEach(function (item) {
                        $('.dircountdown').removeClass(item);
                        setPausedButtons();
                    });
                }
            } else {
                setPausedButtons();
            }
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

        socket.on('cg countdown active', function (ccgData) {
            if (ccgData != 'playing') {
                dataClasses.forEach(function (item) {
                    $('.vtcountdown').removeClass(item);
                });
            }
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
        socket.on('cg countdown path', function (path) {
            $(window).resize(function () {});
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
        ////////////////----CCG OUTDATA

        socket.on('cg volume 1ch', function (volLeftCh) {
            $('.vtcountdown-progress-au1').css('width', (90 + volLeftCh).toFixed(1) + "%");
        });
        socket.on('cg volume 2ch', function (volRightCh) {
            $('.vtcountdown-progress-au2').css('width', (90 + volRightCh).toFixed(1) + "%");
        });

        function setPlayedButtons() {
            $('.reset > i').removeClass('fa-flushed').addClass('fa-grimace');
            $('.play').addClass('pause').children('i').removeClass('fa-play').addClass('fa-pause');
        }

        function setPausedButtons() {
            $('.reset > i').removeClass('fa-grimace').addClass('fa-flushed');
            $('.play').removeClass('pause').children('i').removeClass('fa-pause').addClass('fa-play');
        }
        socket.emit('ip-get', true);

        socket.on('ip', function (ip) {
            $('#ip').html(ip);
        });

        // var end, start;

        // start = new Date();
        // for (var i = 0; i < 360; i++) {
        //     console.log(Math.sqrt(i));
        // }
        // end = new Date();

        // console.log('Операция заняла ' + (end.getTime() - start.getTime()) + ' мсек');

        //////////////////////////////////////////////////////
        ///////////////------SENDING------------//////////////////
        //////////////////////////////////////////////////////


        $('.dircount-buttons').on('click', 'button', function () {
            var btnVal = ['+10min', '+1min', '+10sec', '-10sec', '-1min', '-10min', 'RESET', 'PLAY'];
            var emitVal = ['custom countdown 10m', 'custom countdown 1m', 'custom countdown 10s', 'custom countdown rm10s', 'custom countdown rm1m', 'custom countdown rm10m', 'reset custom countdown', 'toggle custom countdown'];
            var buttonValue = $(this).val();
            btnVal.forEach(function (item, i) {
                if (item == buttonValue) {
                    socket.emit(emitVal[i]);
                    console.log(buttonValue + '---' + emitVal[i]);
                }
            });
        });
        $('.brightness').on('click', 'button', function () {
            var btnVal = ['up', 'down'];
            var emitVal = ['brightness plus', 'brightness minus'];
            var buttonValue = $(this).val();
            btnVal.forEach(function (item, i) {
                if (item == buttonValue) {
                    socket.emit(emitVal[i]);
                }
            });
        });
        $('.refresh').click(function () {
            socket.emit('refresh wall', 1);
            console.log('refresh wall');
        });

        $('p').click(function () {
            $(this).parent().toggleClass('module-slideup');
        });


        $('.chat').keypress(function (e) {
            if (e.which == 13 || event.keyCode == 13) {
                submitMessage();
            }
        });

        $('#submit').on('click', function () {
            submitMessage();
        });
        $('.cleartxt').on('click', function () {
            socket.emit('clear-serverfile', true);
            $('#messages').children().remove();

        });

        function submitMessage() {
            message = $('#message').val();
            if (message != '') {
                socket.emit('clientmessage', ovner, message);
                $('#message').val('');
            }
        }
        socket.emit('read-servermessage', true);
        socket.on('servermessage-update', function (dDate, dTime, srvOvner, srvMsg) {


            if (!$('section.' + dDate).length) {
                // $('#messages').children().remove();
                $('#messages').prepend('<section class="' + dDate + '"><p>' + dDate + '</p></section>');
            }
            $('#messages').find('section.' + dDate).find('p').after(dTime + ' - ' + srvOvner + ' : ' + srvMsg + '<br>');
            // notifyUser(srvOvner, srvMsg, 5000);
        });
        socket.on('servermessage', function (dDate, dTime, srvOvner, srvMsg) {

            if (!$('section.' + dDate).length) {
                $('#messages').prepend('<section class="' + dDate + '"><p>' + dDate + '</p></section>');
            }
            $('#messages').find('section.' + dDate).find('p').after(dTime + ' - ' + srvOvner + ' : ' + srvMsg + '<br>');
            notifyUser(srvOvner, srvMsg, 5000);
        });
    }
});