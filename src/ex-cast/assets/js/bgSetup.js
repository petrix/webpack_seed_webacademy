/**
 * Created by aco on 2016/9/1.
 */

var data = ['images/bk/01.jpg', 'images/bk/02.jpg', 'images/bk/03.jpg', 'images/bk/04.jpg', 'images/bk/05.jpg', 'images/bk/06.jpg', 'images/bk/07.jpg', 'images/bk/08.jpg', 'images/bk/09.jpg', 'images/bk/10.jpg'];
// console.log(data);

function bgAnimation(init, interval) {

    var ele = $(init.ele);

    $.preLoad(data).then(function () {

        /* 获取已绑定变换的元素 */
        var imgChange = ele.bgChange(data, init);
        imgChange.change();
        var timer = interval(imgChange);
        var changeFlag = false;

        /* 点击变换背景元素 */

        ele.on('click', function () {
            if (changeFlag) return;
            changeFlag = true;
            clearInterval(timer);
            imgChange.change();

            /* 开启定时器前必须先清除定时器 */
            clearInterval(timer);
            timer = interval(imgChange);
        });

        /* 监听开始变化事件 避免连续点击导致动画运行多次 */
        ele.on('changeStart', function () {
            changeFlag = true;
        });

        /* 监听结束变化事件 重新开启点击动画 */
        ele.on('changeEnd', function () {
            changeFlag = false;
        });

    });
}

function interval(time) {
    return function (changeEle) {
        return setInterval(function () {
            changeEle.change();
            // console.log(changeEle);
        }, time);

    }
}

/* 以下两种方式，需要引入scss并进行初始化 */

/* 使用默认值 7行9列 */
bgAnimation({
    ele: '#bg-show-wrap-1',
    row: 9,
    col: 9,
    scss: false
}, interval(10000));

/* 手动修改了行列 8行5列 */
// bgAnimation({
//     ele: '#bg-show-wrap-2',
//     row: 8,
//     col: 5
// }, interval(10000));


/* 以下两种方式，不使用 scss 但需要导入 changContain.css */

/* change-contain.css 有一套默认的效果 7行9列 需要将背景变换的父元素加上 .change-contain 类名 */
// bgAnimation({
//     ele: '.change-contain',
//     scss: false
// }, interval(10000));

/* 若不使用行列默认值，5行4列，也不使用 scss ，使用如下方式 */
// bgAnimation({
//     ele: '#bg-show-wrap-4',
//     row: 5,
//     col: 4,
//     scss: false
// }, interval(10000));