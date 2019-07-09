import './weather-js.scss';
// import './js/moment-with-locales.js';
// import './js/skycons.js';
var moment = require('moment');
var moment = require('moment-timezone');

var confirmBtn = document.getElementById('confirmPosition');
var onClickPositionView = document.getElementById('onClickPositionView');
var onIdlePositionView = document.getElementById('onIdlePositionView');

// Initialize locationPicker plugin
var lp = new locationPicker('map', {
    setCurrentPosition: true, // You can omit this, defaults to true
}, {
    zoom: 18 // You can set any google map options here, zoom defaults to 15
});
var weatherLat, weatherLong;
// Listen to button onclick event
confirmBtn.onclick = function () {
    // Get current location and show it in HTML
    var location = lp.getMarkerPosition();
    onClickPositionView.innerHTML = 'The chosen location is ' + location.lat + ',' + location.lng;
    weatherLat = location.lat;
    weatherLong = location.lng;
    mainWeather(weatherLat, weatherLong);

};

// Listen to map idle event, listening to idle event more accurate than listening to ondrag event
google.maps.event.addListener(lp.map, 'idle', function (event) {
    // Get current location and show it in HTML
    var location = lp.getMarkerPosition();
    onIdlePositionView.innerHTML = 'The chosen location is ' + location.lat + ',' + location.lng;
    // weatherLat = location.lat;
    // weatherLong = location.lng;
    // mainWeather(weatherLat, weatherLong);
});
// mainWeather(30.5, 50.5);

function mainWeather(weatherLat, weatherLong) {
    console.log(weatherLat, weatherLong);

    $('.sumhr1').children().remove();
    $('.sumhr2').children().remove();
    $('.daily').children().remove();

    var apiKey = "7d7fb208bc708b6bd2657291246a83e6";
    var url = "https://api.darksky.net/forecast/";
    // var lati = 50.9492;
    // var longi = 30.2034;
    var data;
    var iconvalue = ['clear-day', 'cloudy',
        'snow',
        'partly-cloudy-day',
        'partly-cloudy-night',
        'fog', 'rain', 'wind', 'clear-night'
    ];
    var iconimage = ['<div class="icon clear-day"></div>',
        '<div class="icon cloudy"></div>',
        '<div class="icon snow"></div>',
        '<div class="icon partly-cloudy-day"></div>',
        '<div class="icon partly-cloudy-night"></div>',
        '<div class="icon fog"></div>',
        '<div class="icon rain"></div>',
        '<div class="icon wind"></div>',
        '<div class="icon clear-night"></div>'
    ];
    var iconimagebig = [
        '<div class="iconbig clear-day"></div>',
        '<div class="iconbig cloudy"></div>',
        '<div class="iconbig snow"></div>',
        '<div class="iconbig partly-cloudy-day"></div>',
        '<div class="iconbig partly-cloudy-night"></div>',
        '<div class="iconbig fog"></div>',
        '<div class="iconbig rain"></div>',
        '<div class="iconbig wind"></div>',
        '<div class="iconbig clear-night"></div>'
    ];

    moment.locale('ru');
    $.getJSON(url + apiKey + "/" + weatherLat + "," + weatherLong + "?units=uk&lang=ru&callback=?", function (data) {
        console.log(data.timezone);
        
        moment().tz(data.timezone).format();
        console.log(moment().tz(data.timezone).format());
        var lvivicon = data.currently.icon;
        var lvivsumicon = data.hourly.icon;
        var tempcolor = 'darkred';
        var daynightColor = '#006ac0';
        var tempheight;
        var x = 0;
        var mainIcon, mainIconbig;
        var sunrise, sunset;
        var classDayNight;
        for (var i = 0; i < 24; i++) {
            x++;
            var timesrc = moment.unix(data.hourly.data[i].time).tz(data.timezone);
            console.log(timesrc);            
            var time = timesrc.tz(data.timezone).tz(data.timezone).format('H:mm');
            var timehr = parseFloat(timesrc.tz(data.timezone).format('HH'));
            var timeclass = timesrc.format('l') + ' ' + timesrc.tz(data.timezone).format('HH') + '';
            var sum = data.hourly.data[i].summary;
            var temp = data.hourly.data[i].temperature.toFixed(1);
            var sumicon = data.hourly.data[i].icon;
            // console.log(i, sumicon);
            var humidity = (data.hourly.data[i].humidity * 100).toFixed(0);
            sunrise = parseFloat(moment.unix(data.daily.data[0].sunriseTime).tz(data.timezone).format('H'));
            sunset = parseFloat(moment.unix(data.daily.data[0].sunsetTime).tz(data.timezone).format('H'));
            // console.log(data.hourly.data[i]);
            if (temp < 0) {
                tempheight = temp * -1;
                tempcolor = 'blue';
            } else {
                tempheight = temp;
                tempcolor = 'darkred';
            }
            if (timehr >= sunset) {
                classDayNight = 'night';
                daynightColor = '#006ac0';
            } else if (timehr <= sunrise) {
                classDayNight = 'night';
                daynightColor = '#006ac0';
            } else {
                classDayNight = 'day';
                daynightColor = '#c07600';
            }
            iconvalue.forEach(function (item, i) {
                if (item == sumicon) {
                    mainIcon = iconimage[i];
                }
            });
            tempheight *= 2;
            $(".sumhr1").append(
                '<div class="' + classDayNight + ' ' + timeclass + '" style="background-image: linear-gradient(to top,' + tempcolor + ' ' + (tempheight - 2) + '%,' + daynightColor + ' ' + tempheight + '%' + ')">' +
                '<article>' +
                '<b>' + time + '</b>' +
                '<p>' + 'wind:' + '</p>' +
                '<i class="fas fa-long-arrow-alt-up" style="transform: rotate(' + data.hourly.data[i].windBearing + 'deg)"></i>' +
                '<b>' + data.hourly.data[i].windSpeed.toFixed(1) + '</b>' + '<p>' + 'M/s' + '</p>' + 
                '<hr>' +
                '<i class="fas fa-tint"></i>' + '<b>' + humidity + '%' + '</b>' + 
                '<hr>' +                
                mainIcon +
                '<hr>' +
                '<p>' + 'temp:' + '</p>' +
                '<b>' + temp + "&deg;" + '</b>' +
                '</article>' +
                '</div>'
            );
        }

        x = 24;
        for (i = 24; i < 48; i++) {
            x++;
            var timesrc = moment.unix(data.hourly.data[i].time).tz(data.timezone);
            var time = timesrc.tz(data.timezone).tz(data.timezone).format('H:mm');
            var timehr = parseFloat(timesrc.tz(data.timezone).format('HH'));
            var timeclass = timesrc.format('l') + ' ' + timesrc.tz(data.timezone).format('HH');

            var sum = data.hourly.data[i].summary;
            var temp = data.hourly.data[i].temperature.toFixed(1);
            var sumicon = data.hourly.data[i].icon;
            // console.log(i, sumicon);
            sunrise = parseFloat(moment.unix(data.daily.data[1].sunriseTime).tz(data.timezone).format('H'));
            sunset = parseFloat(moment.unix(data.daily.data[1].sunsetTime).tz(data.timezone).format('H'));
            // console.log(data.hourly.data[i]);

            tempcolor = 'darkred';
            var daynightColor = '#006ac0';
            if (temp < 0) {
                tempheight = temp * -1;
                tempcolor = 'blue';
            } else {
                tempheight = temp;
                tempcolor = 'darkred';
            }
            if (timehr >= sunset) {
                classDayNight = 'night';
                daynightColor = '#006ac0';
            } else if (timehr <= sunrise) {
                classDayNight = 'night';
                daynightColor = '#006ac0';
            } else {
                classDayNight = 'day';
                daynightColor = '#c07600';
            }
            iconvalue.forEach(function (item, i) {
                if (item == sumicon) {
                    mainIcon = iconimage[i];
                }
            });
            tempheight *= 2;
            $(".sumhr2").append(
                '<div class="' + classDayNight + ' ' + timeclass + '" style="background-image: linear-gradient(to top,' + tempcolor + ' ' + (tempheight - 2) + '%,' + daynightColor + ' ' + tempheight + '%' + ')">' +
                '<article>' +
                '<b>' + time + '</b>' +
                '<p>' + 'wind:' + '</p>' +
                '<i class="fas fa-long-arrow-alt-up" style="transform: rotate(' + data.hourly.data[i].windBearing + 'deg)"></i>' +
                '<b>' + data.hourly.data[i].windSpeed.toFixed(1) + '</b>' + '<p>' + 'M/s' + '</p>' +
                '<hr>' +
                '<i class="fas fa-tint"></i>' + '<b>' + humidity + '%' + '</b>' +
                '<hr>' +
                mainIcon +
                '<hr>' +
                '<p>' + 'temp:' + '</p>' +
                '<b>' + temp + "&deg;" + '</b>' +
                '</article>' +
                '</div>'
            );
        }


        var y = 0;
        for (i = 0; i < 7; i++) {
            y++;
            var dailytime = moment.unix(data.daily.data[i].time).tz(data.timezone).format('dddd Do MMMM');
            var dailysum = data.daily.data[i].summary;
            var daysumicon = data.daily.data[i].icon;
            // console.log(i, daysumicon);
            var daymoonPhase = data.daily.data[i].moonPhase;
            var daycloudCover = (data.daily.data[i].cloudCover * 100).toFixed(0) + "%";
            var dayhumidity = (data.daily.data[i].humidity * 100).toFixed(0) + "%";
            var daydewPoint = data.daily.data[i].dewPoint;
            var dayozone = data.daily.data[i].ozone;
            var daypressure = data.daily.data[i].pressure + " hPa";
            var dayvisibility = data.daily.data[i].visibility + " km";
            var dayuvIndex = data.daily.data[i].uvIndex;
            var dayuvIndexTime = moment.unix(data.daily.data[i].uvIndexTime).tz(data.timezone).format('HH:mm')
            var dayprecipProbability = (data.daily.data[i].precipProbability * 100).toFixed(0) + "%";
            var dayprecipIntensityMaxTime = moment.unix(data.daily.data[i].precipIntensityMaxTime).tz(data.timezone).format('HH:mm');
            var dayprecipType = data.daily.data[i].precipType;
            var dayprecipShow = '';
            if (!dayprecipType) {
                dayprecipShow = ' hide';
            }

            var dailytemperatureHigh = data.daily.data[i].temperatureHigh.toFixed(1) + "&deg;C";
            var dailytemperatureLow = data.daily.data[i].temperatureLow.toFixed(1) + "&deg;C";
            var dailytemperatureHighTime = moment.unix(data.daily.data[i].temperatureHighTime).tz(data.timezone).format('HH:mm');
            var dailytemperatureLowTime = moment.unix(data.daily.data[i].temperatureLowTime).tz(data.timezone).format('HH:mm');
            var dailyapparentTemperatureHigh = data.daily.data[i].apparentTemperatureHigh.toFixed(1) + "&deg;C";
            var dailyapparentTemperatureLow = data.daily.data[i].apparentTemperatureLow.toFixed(1) + "&deg;C";
            var dailyapparentTemperatureHighTime = moment.unix(data.daily.data[i].apparentTemperatureHighTime).tz(data.timezone).format('HH:mm');
            var dailyapparentTemperatureLowTime = moment.unix(data.daily.data[i].apparentTemperatureLowTime).tz(data.timezone).format('HH:mm');
            var dailysunrise = moment.unix(data.daily.data[i].sunriseTime).tz(data.timezone).format('HH:mm');
            var dailysunset = moment.unix(data.daily.data[i].sunsetTime).tz(data.timezone).format('HH:mm');
            var dailysunriseHour = parseFloat(moment.unix(data.daily.data[i].sunriseTime).tz(data.timezone).format('H'));
            var dailysunsetHour = parseFloat(moment.unix(data.daily.data[i].sunsetTime).tz(data.timezone).format('H'));
            var dailysunriseMinute = parseFloat(moment.unix(data.daily.data[i].sunriseTime).tz(data.timezone).format('m'));
            var dailysunsetMinute = parseFloat(moment.unix(data.daily.data[i].sunsetTime).tz(data.timezone).format('m'));
            var dailysunrisePercent = ((dailysunriseHour / 24 + dailysunriseMinute / 1440) * 100).toFixed(2);
            var dailysunsetPercent = ((dailysunsetHour / 24 + dailysunsetMinute / 1440) * 100).toFixed(2);

            // console.log('dailysunrise -' + dailysunrisePercent);
            // console.log('dailysunset -' + dailysunsetPercent);
            iconvalue.forEach(function (item, i) {
                if (item == daysumicon) {
                    mainIconbig = iconimagebig[i];
                    // console.log('icon-', i, daysumicon);
                }
            });
            $(".daily").append(
                '<article><div class="row1">' +
                '<span>' + dailytime + '</span>' +
                mainIconbig +
                '</div>' +
                '<hr>' +
                '<span>' + dailysum + '</span>' +

                '<div class="precip' + dayprecipShow + '">' +
                '<b>' + dayprecipProbability + ' - '+ dayprecipIntensityMaxTime + ' - ' + dayprecipType+'</b>' +
                '</div>' +

                '<div class="row2" style="background-image: linear-gradient(to right,#006ac0 ' + (dailysunrisePercent - 1) + '%,' + '#c07600 ' + (dailysunrisePercent) + '%,' + '#c07600 ' + (dailysunsetPercent - 1) + '%,' + '#006ac0 ' + dailysunsetPercent + '%' + ')">' +
                '<div>' +
                '<p>sunrise</p><b>' + dailysunrise + '</b>' +
                '<p>sunset</p><b>' + dailysunset + '</b>' +
                '</div>' +
                '<div>' +
                '<p>tempHigh</p><b>' + dailytemperatureHigh +' - '+ dailytemperatureHighTime + '</b>' +
                // '<b> - ' + '</b>' +
                '<p>tempLow</p><b>' + dailytemperatureLow +' - ' + dailytemperatureLowTime + '</b>' +
                // '<b> - ' +'</b>' +
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
                // '<div class="precip' + dayprecipShow + '">' +
                // '<b>' + dayprecipProbability + '</b>' +
                // '<b>' + dayprecipIntensityMaxTime + ' - ' + dayprecipType +'</b>' +
                // '</div>' +
                '</div></article>');
        }
        $("#lvivcity").html(data.timezone);
        $("#lvivtime").text(moment.unix(data.currently.time).tz(data.timezone).format('HH:mm:ss'));
        $("#lvivtemp").html(data.currently.temperature.toFixed(1) + "&deg;C");
        // $("#lvivtempapp").html(data.currently.apparentTemperature.toFixed(1) + "&deg;C");
        $("#lvivsum").html(data.currently.summary);
        $("#sumhr").html(data.hourly.summary);
        $("#lvivsumdaily").html(data.daily.summary);
    });
    // });





    $('.hourly').on('click', 'div', function () {
        console.log($(this).attr('class'));
    });
}

// });