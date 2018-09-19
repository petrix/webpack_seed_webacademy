import './hw-12-2.scss';


$(".row-title").click(function () {
    $(".row-content").not($(this).next()).slideUp(500);
    $(this).next().slideDown(500);
    $(".row-arrow").not($(this).next()).removeClass('row-arrow-active');
    $(this).children().next().addClass('row-arrow-active');
    
    $('.row-title').not($(this)).removeClass('row-active');
    $(this).addClass('row-active');

    // $(this).next().toggleClass('active');
    // $(this).css('border-radius', '10px 10px 0 0');
    
    console.log(0.1 + 0.3);
});
// $(".row-title").click(function () {
//     $(".row-content").not($(this).next()).removeClass('visible');
//     $(this).next().toggleClass('visible');
// });


// const rows = document.querySelectorAll('.rows');
// var i = 0;
// for (i; i < rows.length ; i++){
//     rows[i].onclick = show;
//     console.log(rows[i]);
//     // console.log(this);
// }
// function show(){
//     // var x = div.querySelectorAll('.row-title');
//     console.log(this.value);
    // console.log(x);
    // console.log(i);
// }

