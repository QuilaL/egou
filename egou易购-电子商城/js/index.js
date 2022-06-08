window.addEventListener('load', function () {
    // 轮播图
    // 零、动画函数封装
    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // 每次动步长值都会变化 所以写道定时器里面
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    };

    var arrowL = document.querySelector('.arrow-l');
    var arrowR = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 一、鼠标经过focus框 就出现左右按钮 离开就隐藏
    focus.addEventListener('mouseenter', function () {
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrowL.style.display = 'none';
        arrowR.style.display = 'none';
        timer = setInterval(function () {
            arrowR.click(); // 手动调用事件
        }, 5000);

    })

    // 二、动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 1.创建li
        var li = document.createElement('li');
        li.setAttribute('index', i);   // 当前小圆圈的索引号 添加自定义属性        
        // 2.把li插入到ol中
        ol.appendChild(li);
        // 4. 生成小圆圈的同时 绑定点击事件 类名current
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 5. 点击小圆圈 移动图片 ul动
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            console.log(index);
            animate(ul, -(index * focusWidth));
        })
    }
    // 3.给当前小圆点类名设置为current
    ol.children[0].className = 'current';

    // 6. 克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var num = 0;  // 在点击箭头事件里 标记当前图片索引
    var circle = 0;   // 用来控制小圆圈的选中 为其增加一个current类名
    var flag = true;
    // 7. 点击左右箭头按钮 图片滚动一张
    arrowR.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            // 8. 点击右侧箭头，小圆圈随之变化，可以再声明一个变量circle
            circle++;
            if (circle == ul.children.length - 1) {
                circle = 0;
            }
            // 清除其他小圆圈的current类名
            circleChange();

        }
    })
    // 9. 点击左箭头按钮 图片滚动一张
    arrowL.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            // 点击右侧箭头，小圆圈随之变化，可以再声明一个变量circle
            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    })
    function circleChange() {
        // 清除其他小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 10. 自动播放
    var timer = setInterval(function () {
        arrowR.click(); // 手动调用事件
    }, 2000);
})