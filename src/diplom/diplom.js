import './diplom.scss';
$(document).ready(function(){
    

    $.get("https://ipinfo.io", function(response) {
        console.log(response.ip, response.country);
      }, "jsonp")



});