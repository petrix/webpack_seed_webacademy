import './cgtimer-2.scss';
import io from 'socket.io-client';
const socket = io('http://p3xx.tk:4000');

var response = $.get("https://ipinfo.io", function (response) {
    console.log(response.ip, response.country, response.loc, response);
}, "jsonp");


socket.on('connect', dir_module);
var date, hours, minutes, seconds, miliseconds;


function dir_module() {
    socket.on('error', (error) => {
        console.log('error');
    });
    socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
            console.log('disconnected');
            socket.connect();
        }
    });
    socket.on('timeofday', function (newDate) {
        $('.current-time-digits').html(moment(newDate).format('HH:mm:ss'));
        // console.log('miliseconds -' + miliseconds);
    });
    var dataDuration;
    socket.on('countdown', function (data) {
        dataDuration = (data.duration).toFixed(0);
        console.log(dataDuration);
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
        // console.log(totalTime);
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
        console.log(mTime);
        $('.vtouttime-digits').text(mTime);
    });
    socket.on('cg volume 1ch', function (volLeftCh) {
        $('.vtcountdown-progress-au1').css('width', (90 + volLeftCh).toFixed(1) + "%");
    });
    socket.on('cg volume 2ch', function (volRightCh) {
        $('.vtcountdown-progress-au2').css('width', (90 + volRightCh).toFixed(1) + "%");
    });

    socket.on('custom play', function () {
        $(toggleSelector).removeClass('btn-warning');
        $(toggleSelector).addClass('btn-success');
        $('#cdgo #cdgo-play > i.fas').removeClass('fa-pause').addClass('fa-play');
        // $('#cdgo span').text('START');
        $('div#dir_countdown_time').css('color', '#646566');
        socket.emit('status off air');

        // $('#cdreset #cdgo-reset > i.fas').removeClass('fa-flushed').addClass('fa-grimace');

        $('#cdreset #cdgo-reset > i.fas').removeClass('fa-grimace').addClass('fa-flushed');
    });

    socket.on('custom pause', function () {
        $('#cdreset #cdgo-reset > i.fas').removeClass('fa-flushed').addClass('fa-grimace');

        $(toggleSelector).removeClass('btn-success');
        $(toggleSelector).addClass('btn-warning');
        // $(toggleSelector).html('<i class="fas fa-pause"></i>');
        // $('#cdbuttons').removeClass('fas fa-play').addClass('fas fa-pause');
        $('#cdgo #cdgo-play > i.fas').removeClass('fa-play').addClass('fa-pause');
        // $('#cdgo span').text('PAUSE');
        socket.emit('status on air reset');

    });
















    //////////////////////////////////////////////////////
    ///////////////------SENDING------------//////////////////
    //////////////////////////////////////////////////////



    $('button').click(function () {
        var buttonValue = $(this).html();
        if (buttonValue == '+10min') {
            socket.emit('custom countdown 10m');
        } else if (buttonValue == '+1min') {
            socket.emit('custom countdown 1m');
        } else if (buttonValue == '+10sec') {
            socket.emit('custom countdown 10s');
        } else if (buttonValue == '-10sec') {
            socket.emit('custom countdown rm10s');
        } else if (buttonValue == '-1min') {
            socket.emit('custom countdown rm1m');
        } else if (buttonValue == '-10min') {
            socket.emit('custom countdown rm10m');
        } else if (buttonValue == 'RESET') {
            socket.emit('reset custom countdown');
        } else if (buttonValue == 'PLAY') {
            socket.emit('toggle custom countdown');
        }

        // 
    });
    //     $('#cdrm1m').click(function() {
    //         
    //     });
    //     $('#cdrm10s').click(function() {
    //         
    //     });
    //     $('#cdadd10s').click(function() {
    //         
    //     });
    //     $('#cdadd1m').click(function() {
    //         
    //     });
    //     $('#cdadd10m').click(function() {
    //         
    //     });
    //     $('#cdreset').click(function() {
    //         
    //     });
    //     $('#cdgo').click(function() {
    //         
    //     });
    // 	$('#brightup').click(function() {
    //         socket.emit('brightness plus');
    // 		// console.log("socket.emit brightness plus");
    //     });
    // 	$('#brightdown').click(function() {
    //         socket.emit('brightness minus');
    // 		// console.log("socket.emit brightness minus");
    //     });
    // $('#brightclockup').click(function() {
    //         socket.emit('brightness clock plus');
    //         console.log("socket.emit brightness clock plus");
    //     });
    //     $('#brightclockdown').click(function() {
    //         socket.emit('brightness clock minus');
    //         console.log("socket.emit brightness clock minus");
    //     });

    //     $('#refreshwall').click(function(){
    //         socket.emit('refresh wall');
    //         // console.log("refresh");
    //     });

}