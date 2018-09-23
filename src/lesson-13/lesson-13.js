import './lesson-13.scss';

function greetingWidget(parentNode){
    const btn = parentNode.querySelector('.control');
    const block = parentNode.querySelector('.block');
    btn.addEventListener('click', toggle);
    btn.addEventListener('click', function(){
        console.log(this);
    });

    function toggle(){
        var name = prompt('enter your name');
        console.log(name);
        if(block.classList.contains('block_visible')){
            return;
        }else{
        block.classList.add('block_visible');
        }
        block.textContent = `${block.textContent} ${name}`;
    }
}
greetingWidget(document.querySelector('.row1'));
greetingWidget(document.querySelector('.row2'));
greetingWidget(document.querySelector('.row3'));
greetingWidget(document.querySelector('.row4'));



// $('button').click(function(){
//     $(this).next().css('opacity', '1');
// })
