import './cgtimer-2.scss';
import io from 'socket.io-client';
var moment = require('./js/moment-with-locales');
var notifyUser = require('./js/notifications.js');
require('./js/jquery.gesture.password.js');
$(document).ready(function () {
    if ("vibrate" in navigator) {
        // vibration API supported
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        console.log('vibrate!');
    }
    $('p').click(function () {
        $(this).parent().toggleClass('module-slideup').parent().children('article').not($(this).parent()).addClass('module-slideup');
        navigator.vibrate([50, 50, 50]); // Бесконечная вибрация.

    });
    moment.locale('uk');
    var ccgPathLength = 35;
    var socket = io('http://p3xx.cf:4000');
    // var response = $.get("https://ipinfo.io", function (response) {
    //     // console.log(response.ip, response.country, response.loc, response);
    // }, "jsonp");
    socket.on('connect', authentificate);

    function authentificate() {
        var ovner = 'Anonimous';
        socket.on('error', (error) => {
            console.log('error');
        });
        socket.on('disconnect', (reason) => {
            if (reason === 'io server disconnect') {
                console.log('disconnected');
                socket.connect();
            }
        });
        socket.emit('read-roles', true);
        var feedBack = 1;
        socket.on('roles-feedback', function (rolesFeedback) {
            if (feedBack < 1) {
                $('.target').append('<option value=' + rolesFeedback + '>' + rolesFeedback + '</option>');
            } else {
                $('.target').append('<option value=' + rolesFeedback + ' selected="selected">' + rolesFeedback + '</option>');
                feedBack--;
            }
            ovner = $('select option:selected').text();
            $('.splashscreen').animate({
                opacity: 0
            }, 500, function () {
                $('.splashscreen').remove();
            });
        });

        $('select').change(function () {
            var str;

            $('select option:selected').each(function () {
                str = $(this).text();
            });
            ovner = str;
        }).trigger('change');

        $('#gesturepwd').GesturePasswd({
            backgroundColor: '#0000', //背景色
            color: '#FF8f00', //主要的控件颜色
            roundRadii: 30, //大圆点的半径
            pointRadii: 15, //大圆点被选中时显示的圆心的半径
            space: 30, //大圆点之间的间隙
            width: 274, //整个组件的宽度
            height: 274, //整个组件的高度
            lineColor: "#ECF0F1", //用户划出线条的颜色
            zindex: 100 //整个组件的css z-index属性
        });
        $('#gesturepwd').on('hasPasswd', function (e, passwd) {
            socket.emit('checkPasswd', ovner, passwd);
        });
        socket.on('passwd-feedback', function (result) {
            if (result) {
                $('#gesturepwd').trigger('passwdRight');
                navigator.vibrate([50, 100, 50, 200, 200]); // Бесконечная вибрация.
                setTimeout(function () {
                    $('.login-window').animate({
                        opacity: 0
                    }, 500, function () {
                        $('.login-window').remove();
                        dir_module(ovner);
                    });
                }, 500); //延迟半秒以照顾视觉效果
            } else {
                $('#gesturepwd').trigger('passwdWrong');
                navigator.vibrate([100, 100, 50]); // Бесконечная вибрация.
            }
        });
    }
    var date, hours, minutes, seconds, miliseconds;

    function dir_module(ovner) {
        notifyUser('You are logged in as:', ovner, 5000);
        socket.emit('ip-get', true);
        socket.emit('countdown-get', true);
        socket.emit('read-servermessage', ovner);
        // console.log(ovner);
        var servermessageUpdate = true;
        socket.on('servermessage-update', function (dDate, dTime, srvOvner, srvMsg) {
            if (servermessageUpdate) {
                if (!$('section.' + dDate).length) {
                    $('#messages').prepend('<section class="' + dDate + '"><p>' + dDate + '</p></section>');
                }
                var dTimeArr = dTime.split(':');
                if (srvOvner == ovner) {
                    $('#messages').find('section.' + dDate).find('p').after('<div class="ovnermessage"><span>' + srvMsg + '</span><div><div><span>' + dTimeArr[0] + '</span><div><span>' + dTimeArr[1] + '</span><span>' + dTimeArr[2] + '</span></div></div><span>' + srvOvner + '</span></div></div><hr>');
                } else {
                    $('#messages').find('section.' + dDate).find('p').after('<div class="guestmessage"><div><div><span>' + dTimeArr[0] + '</span><div><span>' + dTimeArr[1] + '</span><span>' + dTimeArr[2] + '</span></div></div><span>' + srvOvner + '</span></div><span>' + srvMsg + '</span></div><hr>');
                }
            }
        });
        socket.on('servermessage-updated', function () {
            servermessageUpdate = false;
        });
        socket.on('timeofday', function (currentTime) {
            $('.current-time-digits').text(moment(currentTime).format('HH:mm:ss'));
        });
        var dataClasses = ['active', 'warning', 'danger'];
        var dataDuration;
        socket.on('countdown', function (dirDuration, dirActive) {
            dataDuration = (dirDuration).toFixed(0);
            dataClasses.forEach(function (item) {
                $('.dircountdown').removeClass(item);
                $('.dircountdown-advanced').removeClass(item);
            });
            if (dirActive) {
                if (dataDuration > 20) {
                    setPlayedButtons();
                    dataClasses.forEach(function (item) {
                        $('.dircountdown').removeClass(item);
                        $('.dircountdown-advanced').removeClass(item);

                    });
                    $('.dircountdown').addClass('active');
                    $('.dircountdown-advanced').addClass('active');

                } else if (dataDuration > 10) {
                    setPlayedButtons();
                    dataClasses.forEach(function (item) {
                        $('.dircountdown').removeClass(item);
                        $('.dircountdown-advanced').removeClass(item);

                    });
                    $('.dircountdown').addClass('warning');
                    $('.dircountdown-advanced').addClass('warning');
                } else if (dataDuration > 0) {
                    setPlayedButtons();
                    dataClasses.forEach(function (item) {
                        $('.dircountdown').removeClass(item);
                        $('.dircountdown-advanced').removeClass(item);

                    });
                    $('.dircountdown').addClass('danger');
                    $('.dircountdown-advanced').addClass('danger');
                    navigator.vibrate([50, 50, 50]); // Бесконечная вибрация.
                } else {
                    dataClasses.forEach(function (item) {
                        $('.dircountdown').removeClass(item);
                        $('.dircountdown-advanced').removeClass(item);
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
                navigator.vibrate([10]); // Бесконечная вибрация.
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
                    navigator.vibrate([50]); // Бесконечная вибрация.
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
                    console.log(emitVal[i]);
                }
            });
        });
        socket.emit('brightness-get', true);
        socket.on('brightness value', function (brightnessValue) {
            $('.bright-value').text(brightnessValue + '%');
        });

        $('.refresh').click(function () {
            socket.emit('refresh wall', 1);
            console.log('refresh wall');
        });


        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        ///////////////    CHANGE   PASSWORD    ///////////////////
        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////


$('.chngpwdbtn').click(function(){
    $('.chngpwd').append('<p class"p-chngpwd">Current password:</p><div id="chngpwd-current"></div><button>Cancel</button>');
    $('#chngpwd-current').GesturePasswd({
        backgroundColor: '#0000', //背景色
        color: '#FF8f00', //主要的控件颜色
        roundRadii: 30, //大圆点的半径
        pointRadii: 15, //大圆点被选中时显示的圆心的半径
        space: 30, //大圆点之间的间隙
        width: 274, //整个组件的宽度
        height: 274, //整个组件的高度
        lineColor: "#ECF0F1", //用户划出线条的颜色
        zindex: 100 //整个组件的css z-index属性
    });
    $('.chngpwd').addClass('modal-active');
    $('#chngpwd-current').on('hasPasswd', function (e, passwd) {
           socket.emit('checkPasswd', ovner, passwd);
           console.log(ovner, passwd);
       });
       socket.on('passwd-feedback', function (result) {
           console.log(result);
           if (result) {
               $('#chngpwd-current').trigger('passwdRight');
               navigator.vibrate([50, 100, 50, 200, 200]);
                changePasswd();
                return;
           } else {
               $('#chngpwd-current').trigger('passwdWrong');
               navigator.vibrate([100, 100, 50]); // Бесконечная вибрация.
           }
       });
});
function changePasswd(){
    var newPasswd;
    $('.chngpwd').children().remove();
    $('.chngpwd').append('<p class"p-chngpwd">New password:</p><div id="chngpwd-new"></div><button>Cancel</button>');
$('#chngpwd-new').GesturePasswd({
    backgroundColor: '#0000', //背景色
    color: '#FF8f00', //主要的控件颜色
    roundRadii: 30, //大圆点的半径
    pointRadii: 15, //大圆点被选中时显示的圆心的半径
    space: 30, //大圆点之间的间隙
    width: 274, //整个组件的宽度
    height: 274, //整个组件的高度
    lineColor: "#ECF0F1", //用户划出线条的颜色
    zindex: 100 //整个组件的css z-index属性
});
$('#chngpwd-new').on('hasPasswd', function (e, passwd) {
    console.log(ovner, passwd);
    newPasswd=passwd;
               $('#chngpwd-new').trigger('passwdRight');
    $('.chngpwd').children().remove();
    $('.chngpwd').append('<p class"p-chngpwd">Reenter password:</p><div id="chngpwd-renew"></div><button>Cancel</button>');

$('#chngpwd-renew').GesturePasswd({
    backgroundColor: '#0000', //背景色
    color: '#FF8f00', //主要的控件颜色
    roundRadii: 30, //大圆点的半径
    pointRadii: 15, //大圆点被选中时显示的圆心的半径
    space: 30, //大圆点之间的间隙
    width: 274, //整个组件的宽度
    height: 274, //整个组件的高度
    lineColor: "#ECF0F1", //用户划出线条的颜色
    zindex: 100 //整个组件的css z-index属性
});
$('#chngpwd-renew').on('hasPasswd', function (e, passwd) {
if(passwd==newPasswd){
               $('#chngpwd-renew').trigger('passwdRight');
               navigator.vibrate([50, 100, 50, 200, 200]);
socket.emit('update-roles',ovner,newPasswd);
    $('.chngpwd').removeClass('modal-active').children().remove();
}else{
                   $('#chngpwd-renew').trigger('passwdWrong');
                   navigator.vibrate([100, 100, 50]);
}
});
});
}
$('.chngpwd').on('click','button',function(){
    $('.chngpwd').removeClass('modal-active').children().remove();
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

        });
        socket.on('serverfile-empty', function () {
            $('#messages').children().remove();
        });


        function submitMessage() {
            var message = $('#message').val();
            if (message != '') {
                socket.emit('clientmessage', ovner, message);
                $('#message').val('');
            }
        }

        socket.on('servermessage', function (dDate, dTime, srvOvner, srvMsg) {

            if (!$('section.' + dDate).length) {
                $('#messages').prepend('<section class="' + dDate + '"><p>' + dDate + '</p></section>');
            }
            // var dDateArray=
            var dTimeArr = dTime.split(':');
            if (srvOvner == ovner) {
                $('#messages').find('section.' + dDate).find('p').after('<div class="ovnermessage"><span>' + srvMsg + '</span><div><div><span>' + dTimeArr[0] + '</span><div><span>' + dTimeArr[1] + '</span><span>' + dTimeArr[2] + '</span></div></div><span>' + srvOvner + '</span></div></div><hr>');
            } else {
                $('#messages').find('section.' + dDate).find('p').after('<div class="guestmessage"><div><div><span>' + dTimeArr[0] + '</span><div><span>' + dTimeArr[1] + '</span><span>' + dTimeArr[2] + '</span></div></div><span>' + srvOvner + '</span></div><span>' + srvMsg + '</span></div><hr>');
            }
            if (srvOvner != ovner) {
                notifyUser(srvOvner, srvMsg, 5000);
                navigator.vibrate([500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]);
            }

        });
    }
});