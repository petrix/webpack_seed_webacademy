import './hw-12-j.scss';


const tabs = document.querySelectorAll('.tabs_selector');
const tabcontent1 = document.querySelector('.tabcontent1');
const tabcontent2 = document.querySelector('.tabcontent2');
const tabcontent3 = document.querySelector('.tabcontent3');
const selecttab1 = document.querySelector('.selecttab1');
const selecttab2 = document.querySelector('.selecttab2');
const selecttab3 = document.querySelector('.selecttab3');
var i = 0;
for (i; i < tabs.length; i++) {
    tabs[i].onclick = selectTab;
}

function selectTab() {
    // console.log(this);
    if (this.classList.contains('selecttab1')) {
        selecttab1.classList.add('selected-tab');
        selecttab2.classList.remove('selected-tab');
        selecttab3.classList.remove('selected-tab');
        tabcontent1.classList.add('visible');
        tabcontent2.classList.remove('visible');
        tabcontent3.classList.remove('visible');
    } else if (this.classList.contains('selecttab2')) {
        selecttab1.classList.remove('selected-tab');
        selecttab2.classList.add('selected-tab');
        selecttab3.classList.remove('selected-tab');
        tabcontent1.classList.remove('visible');
        tabcontent2.classList.add('visible');
        tabcontent3.classList.remove('visible');
    } else
    // if (this.classList.contains('selecttab3')) 
    {
        selecttab1.classList.remove('selected-tab');
        selecttab2.classList.remove('selected-tab');
        selecttab3.classList.add('selected-tab');
        tabcontent1.classList.remove('visible');
        tabcontent2.classList.remove('visible');
        tabcontent3.classList.add('visible');
    }
}