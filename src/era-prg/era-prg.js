import './era-prg.scss';

$(document).ready(function () {
    function drawButtons() {
        for (var i = 1; i < 10; i++) {
            $('.buttonsrows').append('<button>' + i + '</button>');
            console.log(i);
            // console.log(i);
            // console.log();
        }
    }
    drawButtons();
});