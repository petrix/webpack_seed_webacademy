import './hw-11.scss';

const dropTitle = document.querySelector('#dropmenu-title');
const dropItem1 = document.querySelector('#dropmenu-item1');
const dropItem2 = document.querySelector('#dropmenu-item2');
const dropItem3 = document.querySelector('#dropmenu-item3');
const dropItem4 = document.querySelector('#dropmenu-item4');

// function changeTitle() {
//     //     var dropValue1 = dropItem1.value;
//     //     console.log(dropItem1.value);


// }
// dropItem1.onclick = changeTitle(){

// };
var title = '#dropmenu-title';

$('#dropmenu-item1').click(function() {
    $(title).text('Name')
})
$('#dropmenu-item2').click(function() {
    $(title).text('Date')
})
$('#dropmenu-item3').click(function() {
    $(title).text('Price')
})
$('#dropmenu-item4').click(function() {
    $(title).text('Size')
})

var dropmenuvisible = false;
$('#dropmenu_header').click(function() {
    if (dropmenuvisible) {
        $('#dropmenu-items').css('opacity', '0');
        $('#dropmenu-icon').html('<i class="fas fa-angle-up"></i>');
        dropmenuvisible = false;

    } else {
        $('#dropmenu-items').css('opacity', '1');
        $('#dropmenu-icon').html('<i class="fas fa-angle-down"></i>');

        dropmenuvisible = true;
        // console.log('hz');
    }




})


// $('#dropmenu-item1').css('color', '#f00');