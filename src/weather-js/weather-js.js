import './weather-js.scss';
// import './js/moment-with-locales.js';
// import './js/skycons.js';

$(document).ready(function () {

    var apiKey = "7d7fb208bc708b6bd2657291246a83e6";
    var url = "https://api.darksky.net/forecast/";
    var lati = 50.9492;
    var longi = 30.2034;
    var data;
    var iconvalue = ['cloudy',
        'snow',
        'partly-cloudy-day',
        'partly-cloudy-night',
        'fog'
    ];
    var iconimage = ['<div class="icon cloudy"></div>',
        '<div class="icon snow"></div>',
        '<div class="icon partly-cloudy-day"></div>',
        '<div class="icon partly-cloudy-night"></div>',
        '<div class="icon fog"></div>'
    ];
    var iconimagebig = ['<div class="iconbig cloudy"></div>',
        '<div class="iconbig snow"></div>',
        '<div class="iconbig partly-cloudy-day"></div>',
        '<div class="iconbig partly-cloudy-night"></div>',
        '<div class="iconbig fog"></div>'
    ];
    moment.locale('uk');
    $.getJSON(url + apiKey + "/" + lati + "," + longi + "?units=uk&lang=uk&callback=?", function (data) {
        var lvivicon = data.currently.icon;
        var lvivsumicon = data.hourly.icon;
        var tempcolor = 'darkred';
        var tempheight;
        var x = 0;
        var mainIcon, mainIconbig;
        var sunrise, sunset;
        var classDayNight;
        for (var i = 0; i < 24; i++) {
            x++;
            var timesrc = moment.unix(data.hourly.data[i].time);
            var time = timesrc.format('H:mm');
            var timehr = parseFloat(timesrc.format('HH'));
            var timeclass = timesrc.format('l') + ' ' + timesrc.format('HH') + '';
            var sum = data.hourly.data[i].summary;
            var temp = data.hourly.data[i].temperature.toFixed(1);
            var sumicon = data.hourly.data[i].icon;
            var humidity = data.hourly.data[i].humidity * 100;
            sunrise = parseFloat(moment.unix(data.daily.data[0].sunriseTime).format('H'));
            sunset = parseFloat(moment.unix(data.daily.data[0].sunsetTime).format('H'));
            console.log(data.hourly.data[i]);
            if (temp < 0) {
                tempheight = temp * -1;
                tempcolor = 'blue';
            } else {
                tempheight = temp;
                tempcolor = 'darkred';
            }
            if (timehr >= sunset) {
                classDayNight = 'night';
            } else if (timehr <= sunrise) {
                classDayNight = 'night';
            } else {
                classDayNight = 'day';
            }
            iconvalue.forEach(function (item, i) {
                if (item == sumicon) {
                    mainIcon = iconimage[i];
                }
            });
            $(".sumhr1").append(
                '<div class="' + classDayNight + ' ' + timeclass + '">' +
                '<article>' +
                '<b>' + time + '</b>' +
                '<p>' + 'wind:' + '</p>' +
                '<i class="fas fa-long-arrow-alt-up" style="transform: rotate(' + data.hourly.data[i].windBearing + 'deg)"></i>' +
                '<article><b>' + data.hourly.data[i].windSpeed.toFixed(1) + '</b>' + '<p>' + 'M/s' + '</p>' + '</article>' +
                '<i class="fas fa-tint"></i>' + '<b>' + humidity + '%' + '</b>' +
                '</article>' +
                '<article>' +
                mainIcon +
                '<p>' + 'temp:' + '</p>' +
                '<b>' + temp + "&deg;" + '</b>' +
                '<article style="height:' + tempheight * 10 + 'px;' + 'background-color:' + tempcolor + '">' +
                '</article>' +
                '</article>' +
                '</div>'
            );
        }

        x = 24;
        for (i = 24; i < 48; i++) {
            x++;
            var timesrc = moment.unix(data.hourly.data[i].time);
            var time = timesrc.format('H:mm');
            var timehr = parseFloat(timesrc.format('HH'));
            var timeclass = timesrc.format('l') + ' ' + timesrc.format('HH');

            var sum = data.hourly.data[i].summary;
            var temp = data.hourly.data[i].temperature.toFixed(1);
            var sumicon = data.hourly.data[i].icon;
            sunrise = parseFloat(moment.unix(data.daily.data[1].sunriseTime).format('H'));
            sunset = parseFloat(moment.unix(data.daily.data[1].sunsetTime).format('H'));
            // console.log(data.hourly.data[i]);

            tempcolor = 'darkred';
            if (temp < 0) {
                tempheight = temp * -1;
                tempcolor = 'blue';
            } else {
                tempheight = temp;
                tempcolor = 'darkred';
            }
            if (timehr >= sunset) {
                classDayNight = 'night';
            } else if (timehr <= sunrise) {
                classDayNight = 'night';
            } else {
                classDayNight = 'day';
            }
            iconvalue.forEach(function (item, i) {
                if (item == sumicon) {
                    mainIcon = iconimage[i];
                }
            });
            $(".sumhr2").append(
                '<div class="' + classDayNight + ' ' + timeclass + '">' +
                '<article>' +
                '<b>' + time + '</b>' +
                '<p>' + 'wind:' + '</p>' +
                '<i class="fas fa-long-arrow-alt-up" style="transform: rotate(' + data.hourly.data[i].windBearing + 'deg)"></i>' +
                '<article><b>' + data.hourly.data[i].windSpeed.toFixed(1) + '</b>' + '<p>' + 'M/s' + '</p>' + '</article>' +
                '<i class="fas fa-tint"></i>' + '<b>' + humidity + '%' + '</b>' +
                '</article>' +
                '<article>' +

                mainIcon +

                '<p>' + 'temp:' + '</p>' +
                '<b>' + temp + "&deg;" + '</b>' +

                '<article style="height:' + tempheight * 10 + 'px;' + 'background-color:' + tempcolor + '">' +
                '</article>' +

                '</article>' +

                '</div>'
            );
        }


        var y = 0;
        for (i = 0; i < 7; i++) {
            y++;
            var dailytime = moment.unix(data.daily.data[i].time).format('dddd Do MMMM');
            var dailysum = data.daily.data[i].summary;
            var daysumicon = data.daily.data[i].icon;

            var daymoonPhase = data.daily.data[i].moonPhase;
            var daycloudCover = (data.daily.data[i].cloudCover * 100).toFixed(0) + "%";
            var dayhumidity = (data.daily.data[i].humidity * 100).toFixed(0) + "%";
            var daydewPoint = data.daily.data[i].dewPoint;
            var dayozone = data.daily.data[i].ozone;
            var daypressure = data.daily.data[i].pressure + " hPa";
            var dayvisibility = data.daily.data[i].visibility + " km";
            var dayuvIndex = data.daily.data[i].uvIndex;
            var dayuvIndexTime = moment.unix(data.daily.data[i].uvIndexTime).format('HH:mm')
            var dayprecipProbability = (data.daily.data[i].precipProbability * 100).toFixed(0) + "%";
            var dayprecipIntensityMaxTime = moment.unix(data.daily.data[i].precipIntensityMaxTime).format('HH:mm:ss')
            var dayprecipType = data.daily.data[i].precipType;
            var dayprecipShow = '';
            if (!dayprecipType) {
                dayprecipShow = ' hide';
            }

            var dailytemperatureHigh = data.daily.data[i].temperatureHigh.toFixed(1) + "&deg;C";
            var dailytemperatureLow = data.daily.data[i].temperatureLow.toFixed(1) + "&deg;C";
            var dailytemperatureHighTime = moment.unix(data.daily.data[i].temperatureHighTime).format('HH:mm');
            var dailytemperatureLowTime = moment.unix(data.daily.data[i].temperatureLowTime).format('HH:mm');
            var dailyapparentTemperatureHigh = data.daily.data[i].apparentTemperatureHigh.toFixed(1) + "&deg;C";
            var dailyapparentTemperatureLow = data.daily.data[i].apparentTemperatureLow.toFixed(1) + "&deg;C";
            var dailyapparentTemperatureHighTime = moment.unix(data.daily.data[i].apparentTemperatureHighTime).format('HH:mm');
            var dailyapparentTemperatureLowTime = moment.unix(data.daily.data[i].apparentTemperatureLowTime).format('HH:mm');
            var dailysunrise = moment.unix(data.daily.data[i].sunriseTime).format('HH:mm');
            var dailysunset = moment.unix(data.daily.data[i].sunsetTime).format('HH:mm');
            var dailysunriseHour = parseFloat(moment.unix(data.daily.data[i].sunriseTime).format('H'));
            var dailysunsetHour = parseFloat(moment.unix(data.daily.data[i].sunsetTime).format('H'));
            var dailysunriseMinute = parseFloat(moment.unix(data.daily.data[i].sunriseTime).format('m'));
            var dailysunsetMinute = parseFloat(moment.unix(data.daily.data[i].sunsetTime).format('m'));
            var dailysunrisePercent = ((dailysunriseHour / 24 + dailysunriseMinute / 1440) * 100).toFixed(2);
            var dailysunsetPercent = ((dailysunsetHour / 24 + dailysunsetMinute / 1440) * 100).toFixed(2);

            // console.log('dailysunrise -' + dailysunrisePercent);
            // console.log('dailysunset -' + dailysunsetPercent);
            iconvalue.forEach(function (item, i) {
                if (item == daysumicon) {
                    mainIconbig = iconimagebig[i];
                    console.log('icon-', daysumicon);
                }
            });
            $(".daily").append(
                '<div class="row1">' +
                '<span>' + dailytime + '</span>' +
                mainIconbig +
                '</div>' +
                '<span>' + dailysum + '</span>' +

                '<div class="row2" style="background-image: linear-gradient(to right,#006ac0 ' + (dailysunrisePercent - 1) + '%,' + '#c07600 ' + (dailysunrisePercent) + '%,' + '#c07600 ' + (dailysunsetPercent - 1) + '%,' + '#006ac0 ' + dailysunsetPercent + '%' + ')">' +
                '<div>' +
                '<p>sunrise</p><b>' + dailysunrise + '</b>' +
                '<p>sunset</p><b>' + dailysunset + '</b>' +
                '</div>' +
                '<div>' +
                '<p>tempHigh</p><b>' + dailytemperatureHigh + '</b>' +
                '<b> - ' + dailytemperatureHighTime + '</b>' +
                '<p>tempLow</p><b>' + dailytemperatureLow + '</b>' +
                '<b> - ' + dailytemperatureLowTime + '</b>' +
                '</div>' +
                '<div>' +
                '<p>apparentTempHigh</p><b>' + dailyapparentTemperatureHigh + '</b>' +
                '<b> - ' + dailyapparentTemperatureHighTime + '</b>' +
                '<p>tempHigh</p><b>' + dailyapparentTemperatureLow + '</b>' +
                '<b> - ' + dailyapparentTemperatureLowTime + '</b>' +
                '</div>' +
                '<div>' +
                '<p>moonPhase</p><b>' + daymoonPhase + '</b>' +
                '<p>visibility</p><b>' + dayvisibility + '</b>' +
                '<p>pressure</p><b>' + daypressure + '</b>' +
                '</div>' +
                '<div>' +

                '<p>cloudCover</p><b>' + daycloudCover + '</b>' +
                '<p>humidity</p><b>' + dayhumidity + '</b>' +
                '<p>dewPoint</p><b>' + daydewPoint + '</b>' +
                '</div>' +
                '<div>' +
                '<p>ozone</p><b>' + dayozone + '</b>' +
                '<p>uvIndex</p><b>' + dayuvIndex + '</b>' +
                '<b> - ' + dayuvIndexTime + '</b>' +
                '</div>' +
                '<div class="precip' + dayprecipShow + '">' +
                '<p>precipProbability</p><b>' + dayprecipProbability + '</b>' +
                '<b> - ' + dayprecipIntensityMaxTime + '</b>' +
                '<b> - ' + dayprecipType + '</b>' +
                '</div>' +
                '</div>');
        }
        $("#lvivcity").html(data.timezone);
        $("#lvivtemp").html(data.currently.temperature.toFixed(1) + "&deg;C");
        $("#lvivtempapp").html(data.currently.apparentTemperature.toFixed(1) + "&deg;C");
        $("#lvivtime").text(moment.unix(data.currently.time).format('HH:mm:ss'));
        $("#lvivsum").html(data.currently.summary);
        $("#sumhr").html(data.hourly.summary);
        $("#lvivsumdaily").html(data.daily.summary);
    });
    // });





    $('.hourly').on('click', 'div', function () {
        console.log($(this).attr('class'));
    });

});