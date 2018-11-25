import './weather-js.scss';
// import './js/moment-with-locales.js';
// import './js/skycons.js';

$(document).ready(function () {
    weather_get();
    // console.log('1');

    function weather_get() {
        $(function (gettemp) {
            var apiKey = "7d7fb208bc708b6bd2657291246a83e6";
            var url = "https://api.darksky.net/forecast/";
            var lati = 50.9492;
            var longi = 30.2034;
            var data;
            var iconvalue = ['cloudy', 'snow', 'partly-cloudy-night', 'fog'];
            var iconimage = ['<div class="icon cloudy"></div>', '<div class="icon snow"></div>', '<div class="icon partly-cloudy-night"></div>', '<div class="icon fog"></div>']
            moment.locale('uk');
            $.getJSON(url + apiKey + "/" + lati + "," + longi + "?units=uk&lang=uk&callback=?", function (data) {
                var lvivicon = data.currently.icon;
                var lvivsumicon = data.hourly.icon;
                // console.log(data.currently);
                var tempcolor = 'darkred';
                var tempheight;
                var x = 24;
                var mainIcon;
                for (var i = 24; i > 0; i--) {
                    x--;
                    var time = moment.unix(data.hourly.data[i].time).format('H:mm');
                    var sum = data.hourly.data[i].summary;
                    var temp = data.hourly.data[i].temperature.toFixed(1);
                    var sumicon = data.hourly.data[i].icon;
                    var humidity = data.hourly.data[i].humidity * 100;

                    // console.log(data.hourly.data[i]);
                    console.log(time + sumicon);
                    if (temp < 0) {
                        tempheight = temp * -1;
                        tempcolor = 'blue';
                    } else {
                        tempheight = temp;
                    }
                    iconvalue.forEach(function (item, i) {
                        if (item == sumicon) {
                            mainIcon = iconimage[i];
                            console.log(mainIcon);
                        }
                    });
                    $("#lvivsumhr1").after(
                        '<div>' +
                        '<div>' +
                        '<b>' + time + '</b>' +
                        '<p>' + 'wind:' + '</p>' +
                        '<i class="fas fa-long-arrow-alt-up" style="transform: rotate(' + data.hourly.data[i].windBearing + 'deg)"></i>' +
                        '<span><b>' + data.hourly.data[i].windSpeed.toFixed(1) + '</b><br>' + 'M/s' + '</span>' +
                        '<i class="fas fa-tint"></i>' + humidity + '%' +
                        '</div>' +
                        '<div>' +
                        mainIcon +
                        // '<canvas width="48" height="48" id="sumicon' + x + '">' + 'xxx' + '</canvas>' +


                        '<p>' + 'temp:' + '</p>' +
                        '<span>' + temp + "&deg;" + '</span>' +

                        '<div style="height:' + tempheight * 20 + 'px;' + 'background-color:' + tempcolor + '">' +

                        '</div>' +
                        '</div>' +

                        '</div>'
                    );

                    // var skycons = new Skycons({
                    //     "color": "white"
                    // });
                    // skycons.add("sumicon" + x, sumicon);
                    // skycons.play();
                }


                x = 48;
                for (i = 48; i > 24; i--) {
                    x--;
                    var time = moment.unix(data.hourly.data[i].time).format('H:mm');
                    var sum = data.hourly.data[i].summary;
                    var temp = data.hourly.data[i].temperature.toFixed(1);
                    var sumicon = data.hourly.data[i].icon;
                    // console.log(data.hourly.data[i]);
                    console.log(sumicon);
                    tempcolor = 'darkred';
                    if (temp < 0) {
                        tempheight = temp * -1;
                        tempcolor = 'blue';
                    } else {
                        tempheight = temp;
                    }
                    iconvalue.forEach(function (item, i) {
                        if (item == sumicon) {
                            mainIcon = iconimage[i];
                            console.log(mainIcon);
                        }
                    });
                    $("#lvivsumhr2").after(
                        '<div>' +

                        '<div>' +
                        '<span>' + time + '</span>' +
                        '<p>' + 'wind:' + '</p>' +
                        '<i class="fas fa-long-arrow-alt-up" style="transform: rotate(' + data.hourly.data[i].windBearing + 'deg)"></i>' +
                        '<span><b>' + data.hourly.data[i].windSpeed.toFixed(1) + '</b><br>' + 'M/s' + '</span>' +
                        '<i class="fas fa-tint"></i>' + humidity + '%' +
                        '</div>' +
                        // '<canvas width="48" height="48" id="sumicon' + x + '">' + 'xxx' + '</canvas>' +
                        '<div>' +

                        mainIcon +

                        '<p>' + 'temp:' + '</p>' +
                        '<span>' + temp + "&deg;" + '</span>' +

                        '<div style="height:' + tempheight * 20 + 'px;' + 'background-color:' + tempcolor + '">' +
                        '</div>' +

                        '</div>' +

                        '</div>'
                    );

                    // var skycons = new Skycons({
                    //     "color": "white"
                    // });
                    // skycons.add("sumicon" + x, sumicon);
                    // skycons.play();
                }


                var y = 7;
                for (i = 7; i > -1; i--) {
                    y--;
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
                    $("#lvivsumdailydown").after(
                        '<div class="row1">' +
                        '<span>' + dailytime + '</span>' +
                        '<canvas width="128" height="128" id="daysumicon' + y + '">' + 'xxx' + '</canvas>' +
                        '<span>' + dailysum + '</span>' +
                        '</div>' +
                        '<div class="row2">' +
                        '<div>' +
                        '<span>sunrise<br>- ' + dailysunrise + '</span>' +
                        '<span>sunset<br>- ' + dailysunset + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>tempHigh<br>' + dailytemperatureHigh + '</span>' +
                        '<span> - ' + dailytemperatureHighTime + '</span>' +
                        '<span>tempLow<br>' + dailytemperatureLow + '</span>' +
                        '<span> - ' + dailytemperatureLowTime + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>apparentTempHigh<br>' + dailyapparentTemperatureHigh + '</span>' +
                        '<span> - ' + dailyapparentTemperatureHighTime + '</span>' +
                        '<span>apparentTempLow<br>' + dailyapparentTemperatureLow + '</span>' +
                        '<span> - ' + dailyapparentTemperatureLowTime + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>moonPhase<br>- ' + daymoonPhase + '</span>' +
                        '<span>visibility<br>- ' + dayvisibility + '</span>' +
                        '<span>pressure<br>- ' + daypressure + '</span>' +
                        '</div>' +
                        '<div>' +

                        '<span>cloudCover<br>- ' + daycloudCover + '</span>' +
                        '<span>humidity<br>- ' + dayhumidity + '</span>' +
                        '<span>dewPoint<br>- ' + daydewPoint + '</span>' +
                        '</div>' +
                        '<div>' +
                        '<span>ozone<br>- ' + dayozone + '</span>' +
                        '<span>uvIndex<br> - ' + dayuvIndex + '</span>' +
                        '<span> - ' + dayuvIndexTime + '</span>' +
                        '</div>' +
                        '<div class="precip">' +
                        '<span>precipProbability<br>- ' + dayprecipProbability + '</span>' +
                        '<span> - ' + dayprecipIntensityMaxTime + '</span>' +
                        '<span> - ' + dayprecipType + '</span>' +
                        '</div>' +
                        '</div>');
                    // var dayskycons = new Skycons({
                    //     "color": "white"
                    // });
                    // dayskycons.add("daysumicon" + y, daysumicon);
                    // dayskycons.play();
                }





                $("#lvivcity").html(data.timezone);
                $("#lvivtemp").html(data.currently.temperature.toFixed(1) + "&deg;C");
                $("#lvivtempapp").html(data.currently.apparentTemperature.toFixed(1) + "&deg;C");
                $("#lvivtime").text(moment.unix(data.currently.time).format('HH:mm:ss'));
                $("#lvivsum").html(data.currently.summary);
                $("#lvivsumhr").html(data.hourly.summary);
                $("#lvivsumdaily").html(data.daily.summary);
                // var skyconslvivicon = new Skycons({
                //     "color": "white"
                // });
                // skyconslvivicon.add("lvivicon", lvivicon);
                // skyconslvivicon.play();
                // var skyconslvivsumicon = new Skycons({
                //     "color": "white"
                // });
                // skyconslvivsumicon.add("lvivsumicon", lvivsumicon);
                // skyconslvivsumicon.play();

            });
        });
    }

});