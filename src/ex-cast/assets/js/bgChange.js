/*
 * Created by aco on 2016/9/1.
 */


(function ($) {

    // 预加载图片
    $.preLoad = function (arr) {
        arr = (typeof arr != "object") ? [arr] : arr;

        var defer = $.Deferred();

        var images = [],
            loadedImages = arr.length;

        function check() {
            loadedImages--;
            if (loadedImages === 0) {
                defer.resolve(images);
            }
        }

        for (var i = 0; i < arr.length; i++) {
            images[i] = new Image();
            images[i].src = arr[i];
            images[i].onload = check;
            images[i].onerror = check;
        }

        return defer.promise();
    };

    // 用于获取随机值
    $.randomI = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };

    $.fn.bgChange = function (arr, options) {

        var _this = this;
        $(_this).css('position', 'fixed');
        arr = [].concat(arr);
        var defaults = {
            row: 7,
            col: 9,
            scss: true
        };

        options = $.extend(defaults, options);

        // 根据所给的行列生产一系列的运动形式
        var methods = [{
            tDuration: '1s',
            sDuration: '140',
            init: function () {
                this.num = 2;
            },
            check: function (i, j) {
                return i + j == this.num;
            },
            next: function () {
                this.num++;
            },
            end: function () {
                return options.col + options.row + 1 == this.num;
            }
        }, {
            tDuration: '1s',
            sDuration: '140',
            init: function () {
                this.num = options.row - 1;
            },
            check: function (i, j) {
                return i - j == this.num;
            },
            next: function () {
                this.num--;
            },
            end: function () {
                return 1 - options.col - 1 == this.num;
            }
        }, {
            tDuration: '1s',
            sDuration: '140',
            init: function () {
                this.num = options.row + options.col;
            },
            check: function (i, j) {
                return i + j == this.num;
            },
            next: function () {
                this.num--;
            },
            end: function () {
                return -1 == this.num;
            }
        }, {
            tDuration: '1s',
            sDuration: '140',
            init: function () {
                this.num = 1 - options.col;
            },
            check: function (i, j) {
                return i - j == this.num;
            },
            next: function () {
                this.num++;
            },
            end: function () {
                return options.row - 1 + 1 == this.num;
            }
        }, {
            tDuration: '1.2s',
            sDuration: '200',
            init: function () {
                this.num = 1;
            },
            check: function (i, j) {
                return i == this.num;
            },
            next: function () {
                this.num++;
            },
            end: function () {
                return options.row + 1 == this.num;
            }
        }, {
            tDuration: '1.2s',
            sDuration: '200',
            init: function () {
                this.num = 1;
            },
            check: function (i, j) {
                return j == this.num;
            },
            next: function () {
                this.num++;
            },
            end: function () {
                return options.col + 1 == this.num;
            }
        }, {
            tDuration: '1.2s',
            sDuration: '200',
            init: function () {
                this.num = options.row;
            },
            check: function (i, j) {
                return i == this.num;
            },
            next: function () {
                this.num--;
            },
            end: function () {
                return 0 == this.num;
            }
        }, {
            tDuration: '1.2s',
            sDuration: '200',
            init: function () {
                this.num = options.col;
            },
            check: function (i, j) {
                return j == this.num;
            },
            next: function () {
                this.num--;
            },
            end: function () {
                return 0 === this.num;
            }
        }, {
            tDuration: '1.2s',
            sDuration: '200',
            init: function () {
                this.num = 1;
            },
            check: function (i, j) {
                return i == this.num || j == this.num;
            },
            next: function () {
                this.num++;
            },
            end: function () {
                if (options.row > options.col) {
                    return options.row == this.num;
                } else {
                    return options.col == this.num;
                }
            }
        }, {
            tDuration: '1.2s',
            sDuration: '200',
            init: function () {
                this.num = 1;
            },
            check: function (i, j) {
                return options.row - i + 1 == this.num || options.col - j + 1 == this.num;
            },
            next: function () {
                this.num++;
            },
            end: function () {
                if (options.row > options.col) {
                    return i == this.num;
                } else {
                    return j == this.num;
                }
            }
        }, {
            tDuration: '1.2s',
            sDuration: '200',
            init: function () {
                this.num = 1;
            },
            check: function (i, j) {
                return i == this.num || options.col - j + 1 == this.num;
            },
            next: function () {
                this.num++;
            },
            end: function () {
                if (options.row > options.col) {
                    return options.row == this.num;
                } else {
                    return j == this.num;
                }
            }
        }, {
            tDuration: '1.2s',
            sDuration: '200',
            init: function () {
                this.num = 1;
            },
            check: function (i, j) {
                return options.row - i + 1 == this.num || j == this.num;
            },
            next: function () {
                this.num++;
            },
            end: function () {
                if (options.row > options.col) {
                    return i == this.num;
                } else {
                    return options.col == this.num;
                }
            }
        }, {
            tDuration: '1.4s',
            sDuration: '300',
            init: function () {
                this.num = 1;
            },
            check: function (i, j) {
                return i == this.num || j == this.num || options.row - i + 1 == this.num || options.col - j + 1 == this.num;
            },
            next: function () {
                this.num++;
            },
            end: function () {
                if (options.row > options.col) {
                    return Math.floor(options.row / 2) + 1 == this.num;
                } else {
                    return Math.floor(options.col / 2) + 1 == this.num;
                }
            }
        }, {
            num: 1,
            position: {},
            tDuration: '1.8s',
            sDuration: '320',
            init: function () {
                this.num = 1;
                this.position.x = (options.row + 1) / 2;
                this.position.y = (options.col + 1) / 2;
            },
            check: function (i, j) {
                return Math.abs(i - this.position.x) + Math.abs(j - this.position.y) < this.num;
            },
            next: function () {
                this.num++;
            },
            end: function () {
                return this.num > this.position.x + this.position.y;
            }
        }, {
            num: 0,
            start: (options.row > options.col ? 'options.col' : 'options.row'),
            tDuration: '1.6s',
            sDuration: '300',
            init: function () {
                this.num = options.row > options.col ? Math.floor(options.col / 2) : Math.floor(options.row / 2);
            },
            check: function (i, j) {
                if (this.start == 'options.row') {
                    return i - this.num >= 1 && i + this.num < options.row + 1 && j - this.num >= 1 && j + this.num < options.col + 1;
                }
                if (this.start == 'options.col') {
                    return j - this.num >= 1 && j + this.num < options.col + 1 && i - this.num >= 1 && i + this.num < options.row + 1;
                }
            },
            next: function () {
                this.num--;
            },
            end: function () {
                return this.num == -1;
            }
        }, {
            tDuration: '.6s',
            sDuration: '50',
            direction: 'row',
            init: function () {
                this.point = [
                    [1, 1],
                    [1, options.col],
                    [options.row, options.col],
                    [options.row, 1]
                ];
                this.point[0] = [2, 1];
                this.direction = 'row';
                this.positive = true;
                this.iNow = 1;
                this.jNow = 1;
                this.allNum = options.col * options.row;
            },
            check: function (i, j) {
                return i == this.iNow && j == this.jNow;
            },
            next: function () {
                this.allNum--;
                if (this.direction == 'row' && this.jNow < this.point[1][1] && this.positive) {
                    this.jNow++;
                    if (this.jNow == this.point[1][1]) {
                        this.point[1] = [this.point[1][0] + 1, this.point[1][1] - 1];
                        this.direction = 'col';
                        this.positive = true;
                    }
                } else if (this.direction == 'col' && this.iNow < this.point[2][0] && this.positive) {
                    this.iNow++;
                    if (this.iNow == this.point[2][0]) {
                        this.point[2] = [this.point[2][0] - 1, this.point[2][1] - 1];
                        this.direction = 'row';
                        this.positive = false;
                    }
                } else if (this.direction == 'row' && this.jNow > this.point[3][1] && !this.positive) {
                    this.jNow--;
                    if (this.jNow == this.point[3][1]) {
                        this.point[3] = [this.point[3][0] - 1, this.point[3][1] + 1];
                        this.direction = 'col';
                        this.positive = false;
                    }
                } else if (this.direction == 'col' && this.iNow > this.point[0][0] && !this.positive) {
                    this.iNow--;
                    if (this.iNow == this.point[0][0]) {
                        this.point[0] = [this.point[0][0] + 1, this.point[0][1] + 1];
                        this.direction = 'row';
                        this.positive = true;
                    }
                }
            },
            end: function () {
                return this.allNum === 0;
            }
        }];

        // 预定义的动画效果
        var className = 'start-change';
        var wrap = $(_this);
        var html = '';

        // 生成 DOM 节点
        // 根据是否使用 scss 文件来动态添加 DOM 节点
        if (options.scss || (options.row == 7 && options.col == 9)) {
            for (var i = 1; i <= options.row; i++) {
                for (var j = 1; j <= options.col; j++) {
                    html += '<div class="animation-item item-' + i + '-' + j + '"><div class="child"></div></div>';
                }
            }
        } else {
            for (var n = 1; n <= options.row; n++) {
                for (var m = 1; m <= options.col; m++) {
                    var className_all = 'animation-item item-' + n + '-' + m;
                    var style1 = [
                        'width:' + 100 / options.col + '%;',
                        'height:' + 100 / options.row + '%;',
                        'top:' + 100 / options.row * (n - 1) + '%;',
                        'left:' + 100 / options.col * (m - 1) + '%;'
                    ].join('');
                    var style2 = [
                        'top:' + (-100 * (n - 1)) + '%;',
                        'left:' + (-100 * (m - 1)) + '%;',
                        'width:' + options.col * 100 + '%;',
                        'height:' + options.row * 100 + '%;'
                    ].join('');

                    html += [
                        '<div class="' + className_all + '" ',
                        'style="' + style1 + '"',
                        '><div class="child" ',
                        'style="' + style2 + '"',
                        '></div></div>'
                    ].join('');
                }
            }
        }

        wrap.html(html);

        function itemChange(className, addClass, imgAdd) {
            var item = _this.find(className);
            item.addClass(addClass).data('change', 1)
                .on('transitionend webkitTransitionEnd', function () {
                    if ($(this).hasClass(addClass))
                        $(this).removeClass(addClass)
                        .find('.child').css('background-image', 'url("' + imgAdd + '")');
                    $(this).off('transitionend webkitTransitionEnd');
                });
        }

        // 防止动画未结束被再次调用
        var lock = false;

        // 防止同一张图片连续显示
        var imgIndexTmp = -1,
            imgIndex = -1;

        function change(method, addClass) {

            // 防止动画未结束被再次调用
            if (lock) return;
            lock = true;

            // 若无参数则随机生产运动形式
            method = method || methods[$.randomI(0, methods.length)];
            addClass = addClass || className;

            // 每个块的动画的持续时间，由于运动形式不一样，持续时间也不一致
            _this.find('.animation-item').css({
                'transition': method.tDuration
            });

            // 防止同一张图片连续显示
            do {
                imgIndex = $.randomI(0, arr.length);
            } while (imgIndex === imgIndexTmp);
            imgIndexTmp = imgIndex;

            var img = arr[imgIndex];
            method.init();

            // 触发动画开始事件
            _this.trigger('changeStart');
            var timer = setInterval(function () {
                for (var i = 1; i <= options.row; i++) {
                    for (var j = 1; j <= options.col; j++) {
                        if (method.check(i, j)) {
                            var className = '.item-' + i + '-' + j;
                            if (_this.find(className).data('change') != 1) {
                                itemChange(className, addClass, img);
                            }
                        }
                    }
                }
                method.next();
                if (method.end()) {
                    clearInterval(timer);
                    _this.find('.animation-item').data('change', 0);
                    setTimeout(function () {
                        _this.find('.animation-item').removeClass(method.duration);
                        // 触发动画结束事件，同时打开锁
                        _this.trigger('changeEnd');
                        lock = false;
                    }, 2000);
                }
            }, method.sDuration);
        }

        return {
            change: change,
            method: methods,
            changeImages: function (imageList) {
                arr = imageList;
            }
        };
    };

})(jQuery);