import './cgtimer-2.scss';
import io from 'socket.io-client';



$(document).ready(function () {
    const socket = io('http://p3xx.tk:4000');

    var response = $.get("https://ipinfo.io", function (response) {
        console.log(response.ip, response.country, response.loc, response);
    }, "jsonp");

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
            // console.log(socket.id, 'socket connected');
            $('.current-time-digits').html(moment(currentTime).format('HH:mm:ss'));

        });
        var dataClasses = ['active', 'warning', 'danger'];
        // var dataDuration;
        socket.on('countdown', function (dataDuration, dataActive) {
            dataDuration = (dataDuration).toFixed(0);
            // console.log("dataActive - " +dataActive);
            dataClasses.forEach(function (item) {
                $('.dircountdown').removeClass(item);
            });
            if (dataActive) {
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

            // console.log('dataDuration -' + dataDuration);
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


        var activeDataTemp = 20;
        var ccgActive = false;
        socket.on('cg countdown active', function (activeData) {
            // console.log(activeData);

            if (activeData) {
                // console.log('playing');
                activeDataTemp = 20;
                ccgActive = true;
            } else {
                activeDataTemp--;
                if (activeDataTemp < 0) {
                    // console.log(activeDataTemp);
                    activeDataTemp = 0;
                    ccgActive = false;
                    // console.log('not playing');
                    dataClasses.forEach(function (item) {
                        $('.vtcountdown').removeClass(item);
                    });
                    activeDataTemp = 0;
                }
            }
        });




        socket.on('cg countdown timeData', function (ccgTime, ccgTotalTime) {
            var procentTime = ((ccgTime * 100) / ccgTotalTime);
            $('.vtcountdown-progress-success').css('width', procentTime.toFixed(0) + '%');
            // console.log('ccgTime -- ' + ccgTime.toFixed(0) + 'seconds');
            var vtHours = Math.floor(ccgTime / 3600);
            var vtMinutes = Math.floor((ccgTime - vtHours * 3600) / 60);
            var vtSeconds = ccgTime - (vtMinutes * 60 + vtHours * 3600);
            vtSeconds = Math.floor(vtSeconds);
            vtHours = (vtHours < 10 ? "0" : "") + vtHours;
            vtMinutes = (vtMinutes < 10 ? "0" : "") + vtMinutes;
            vtSeconds = (vtSeconds < 10 ? "0" : "") + vtSeconds;
            $('.vtcountdown-digits').text(vtHours + ':' + vtMinutes + ':' + vtSeconds);

            if (ccgTime > 20) {
                dataClasses.forEach(function (item) {
                    $('.vtcountdown').removeClass(item);
                });
                $('.vtcountdown').addClass('active');
            }
            if (10 < ccgTime && ccgTime < 20) {
                dataClasses.forEach(function (item) {
                    $('.vtcountdown').removeClass(item);
                });
                $('.vtcountdown').addClass('warning');
            }
            if (ccgTime < 10) {
                dataClasses.forEach(function (item) {
                    $('.vtcountdown').removeClass(item);
                });
                $('.vtcountdown').addClass('danger');
            }
            if (ccgTime < 1) {
                dataClasses.forEach(function (item) {
                    $('.vtcountdown').removeClass(item);
                });
            }

        });
        socket.on('cg countdown path', function (path) {
            var ccgPath = path.split("/").pop().replace(".mov", "").replace(".mp4", "");
            if (ccgPath.length > 35) {
                ccgPath = ccgPath.substr(0, 32) + "...";
            }
            $('.vtcountdown-title').text(ccgPath);
        });
        socket.on('cg countdown outdata', function (outTime) {
            var mTime = moment.unix(outTime).format('HH:mm:ss');
            $('.vtouttime-digits').text(mTime);
        });
        socket.on('cg volume 1ch', function (volLeftCh) {
            $('.vtcountdown-progress-au1').css('width', (90 + volLeftCh).toFixed(1) + "%");
        });
        socket.on('cg volume 2ch', function (volRightCh) {
            $('.vtcountdown-progress-au2').css('width', (90 + volRightCh).toFixed(1) + "%");
        });

        // socket.on('custom play', function () {
        //     socket.emit('status off air');
        // });

        // socket.on('custom pause', function () {
        //     socket.emit('status on air reset');
        // });

        function setPlayedButtons() {
            $('.reset > i').removeClass('fa-flushed').addClass('fa-grimace');
            $('.play').addClass('pause').children('i').removeClass('fa-play').addClass('fa-pause');
        }

        function setPausedButtons() {
            $('.reset > i').removeClass('fa-grimace').addClass('fa-flushed');
            $('.play').removeClass('pause').children('i').removeClass('fa-pause').addClass('fa-play');
        }




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

        var btnVal = ['+10min', '+1min', '+10sec', '-10sec', '-1min', '-10min', 'RESET', 'PLAY'];
        var emitVal = ['custom countdown 10m', 'custom countdown 1m', 'custom countdown 10s', 'custom countdown rm10s', 'custom countdown rm1m', 'custom countdown rm10m', 'reset custom countdown', 'toggle custom countdown']
        $('button').click(function () {
            var buttonValue = $(this).val();
            btnVal.forEach(function (item, i) {
                if (item == buttonValue) {
                    socket.emit(emitVal[i]);
                    console.log(buttonValue + '---' + emitVal[i]);
                }
            });
        });
    }

});