import './hw-11.scss';

const dropTitle = document.querySelector('#dropmenu-title');
const dropItem1 = document.querySelector('#dropmenu-item1');
const dropItem2 = document.querySelector('#dropmenu-item2');
const dropItem3 = document.querySelector('#dropmenu-item3');
const dropItem4 = document.querySelector('#dropmenu-item4');

function changeTitle() {
    var dropValue1 = dropItem1.value;
    console.log(dropItem1.value);
}

dropItem1.onclick = changeTitle();