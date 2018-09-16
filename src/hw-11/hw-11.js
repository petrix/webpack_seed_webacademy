import './hw-11.scss';


var title = '#dropmenu-title';

$('#dropmenu-item1').click(function() {
    $(title).text('Name')
            $('#dropmenu-items').css({ 'opacity': '0.5', 'transform': 'scaleY(0)' });
        $('#dropmenu-icon').html('<i class="fas fa-angle-up"></i>');
        dropmenuvisible = false;
})
$('#dropmenu-item2').click(function() {
    $(title).text('Date')
            $('#dropmenu-items').css({ 'opacity': '0.5', 'transform': 'scaleY(0)' });
        $('#dropmenu-icon').html('<i class="fas fa-angle-up"></i>');
        dropmenuvisible = false;
})
$('#dropmenu-item3').click(function() {
    $(title).text('Price')
            $('#dropmenu-items').css({ 'opacity': '0.5', 'transform': 'scaleY(0)' });
        $('#dropmenu-icon').html('<i class="fas fa-angle-up"></i>');
        dropmenuvisible = false;
})
$('#dropmenu-item4').click(function() {
    $(title).text('Size')
            $('#dropmenu-items').css({ 'opacity': '0.5', 'transform': 'scaleY(0)' });
        $('#dropmenu-icon').html('<i class="fas fa-angle-up"></i>');
        dropmenuvisible = false;
})

var dropmenuvisible = false;
$('#dropmenu_header').click(function() {
    if (dropmenuvisible) {
        $('#dropmenu-items').css({ 'opacity': '0.5', 'transform': 'scaleY(0)' });
        $('#dropmenu-icon').html('<i class="fas fa-angle-up"></i>');
        dropmenuvisible = false;

    } else {
        $('#dropmenu-items').css({ 'opacity': '1', 'transform': 'scaleY(1)' });
        $('#dropmenu-icon').html('<i class="fas fa-angle-down"></i>');
        dropmenuvisible = true;
    }
});




// $('#dropmenu-item1').css('color', '#f00');