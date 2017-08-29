var CSS3Prefix = (function () {
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
        transform,
        i = 0,
        l = vendors.length;

    var _elementStyle = document.createElement('div').style;
    for ( ; i < l; i++ ) {
        transform = vendors[i] + 'ransform';
        if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
    }

    return false;
})();

// 顶部搜索
$(function () {
    var $section = $('.top-section');
    var $showBtn = $section.find('.x-search');
    var $layer = $section.find('.top-search-layer');
    $showBtn.click(function () {
        $layer.toggle();
    });
    $layer.find('.x-close').click(function () {
        $layer.hide();
    });
});

// banner轮播图
$(function () {
    /*
    $('.banner').slide({
        mainCell: '.bd ul',
        titCell: '.hd li',
        autoPlay: true,
        interTime: 3000,
        delayTime: 1000
    });
    */
});

// 主治疾病动画
$(function () {
    var $cureSection = $('.main-cure-section');
    var $left = $cureSection.children('.x-left');
    var $right = $cureSection.children('.x-right');
    var $wrapper = $right.children('.x-wrapper');
    var $items = $wrapper.children('.img-list').find('li');
    var $hovers = $wrapper.children('.hover-item');

    var deg = 0;
    var step = .5;
    var interval = 30;
    var contentMap = {
        1: {
            title: '妇女气虚血亏',
            content: '是由于脾胃虚弱、饮食不足、失血过多、肾气亏虚、劳作过度导致脏腑失于濡养，表现为头晕乏力，失眠等症状，所以要益气养血。'
        },
        2: {
            title: '筋骨疼痛',
            content: '是指全身关节受风、寒侵袭，或外伤、慢性劳损而形成，表现为筋骨关节酸痛，麻木、肿胀等症状，所以要祛风除湿、活血化瘀。'
        },
        3: {
            title: '综合调理',
            content: '鸿茅药酒帮助中老年人健脾温肾、补益气血，改善气血亏虚，还能缓解脾胃虚寒等症，是中老年人综合调理身体的好方法。'
        },
        4: {
            title: '脾胃虚寒',
            content: '是由于饮食习惯不良，生活节奏快，精神压力大等导致，表现为胃寒胃痛等症状，所以要温胃健脾。'
        },
        5: {
            title: '肾亏腰酸',
            content: '是由于后天劳累或久病体虚导致，表现为浑身没劲、畏寒肢冷、手脚发凉、腰膝酸软、夜尿频多等症状，所以要补肾益精。'
        },
        6: {
            title: '风寒湿痹',
            content: '是指外感风寒湿邪造成气血运行不畅而发病。表现为颈、肩、腰、腿、手足关节酸、麻、胀、痛、肿等症状,所以要祛风除湿、疏通经络。'
        }
    };
    var run = function () {
        var property = CSS3Prefix ? (CSS3Prefix + 'Transform') : 'transform';
        $wrapper.css(property, 'rotate(' + deg + 'deg)');
        $items.find('.x-vender').css(property, 'rotate(-' + deg + 'deg)');
        $items.find('.x-text').css(property, 'rotate(-' + deg + 'deg)');
        deg += step;
        if (deg >= 360) {
            deg = 0;
        }
        timer = setTimeout(run, interval);
    };
    var stop = function () {
        $('#introlink').addClass('show');
        var index = this.getAttribute('data-i');
        var item = contentMap[index];
        if (item) {
            $left.children('h5').html(item.title);
            $left.children('p').html(item.content);
        }
        // img item
        var $imgItem = $items.eq(index - 1);
        $imgItem.addClass('hover');
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };
    // var bind = function () {
    //     $hovers.hover(stop, function () {
    //         $items.removeClass('hover');
    //         run();
    //     });

    //     $(document.body).on('mousemove', function (e) {
    //         var x = e.clientX;
    //         var left = $right.offset().left;
    //         var diff = left - x;
    //         if (diff < 100) {
    //         } else {
    //         }
    //     });
    // };

    // run();
    // bind();
});



bindZizhi()
function bindZizhi() {
    var $section = $('.zizhi-section');
    $section.find('ul li').hover(function () {
        var $this = $(this);
        var $cover = $this.find('.x-cover');
        var $content = $this.find('.x-content');
        var $text = $this.find('.x-text');

        /*
        $cover.animate({
            top: 0
        });
        $content.animate({
            top: 0
        });
        */
        $text.stop();
        $text.animate({
            top: 0
        });
    }, function () {
        var $this = $(this);
        var $cover = $this.find('.x-cover');
        var $content = $this.find('.x-content');
        var $text = $this.find('.x-text');
        /*
        $cover.animate({
            top: '-100%'
        });
        $content.animate({
            top: '-100%'
        });
        */
        $text.stop();
        $text.animate({
            top: '-100%'
        });
    });
}

(function () {
    var $comment = $('.comment-section');
    var $cureSection = $('.main-cure-section');
    var docE = document.documentElement;
    var body = document.body;
    function showComment() {
        if (showComment.__done) {
            return;
        }
        showComment.__done = true;
        var delay = 0;
        $comment.find('ul li').each(function () {
            var $li = $(this);
            setTimeout(function () {
                $li.css('opacity', 0);
                $li.css('visibility', 'visible').animate({
                    opacity: 1
                }, 1000);
            }, delay);
            delay += 1000;
        });
    }
    function showCureImg() {
        if (showCureImg.__done) {
            return;
        }
        showCureImg.__done = true;
        var $img = $cureSection.children('.x-left').find('.img-1');
        $img.animate({
            opacity: 1,
            top: '135px'
        }, 1000);
    }
    function onScroll() {
        var scrollTop = docE.scrollTop || body.scrollTop;
        var clientHeight = docE.clientHeight || body.clientHeight;

        // 评论
        if (scrollTop + clientHeight - 400 > $comment.offset().top) {
            showComment();
        }
        // 主治疾病-img
        if (scrollTop + clientHeight - 300 > $cureSection.offset().top) {
            showCureImg();
        }
    }
    $(window).on('scroll resize', onScroll);

    onScroll();
})();

// 正品防伪
$(function () {
    var $section = $('.zheng-pin-fang-wei');
    var $leftActive = $section.find('.x-left-active');
    var $midActive = $section.find('.x-mid-active');
    var $rightActive = $section.find('.x-right-active');

    var $blocks = {};
    $blocks['left'] = $section.find('.x-left');
    $blocks['mid'] = $section.find('.x-mid');
    $blocks['right'] = $section.find('.x-right');

    var IE8 = false;
    try{
        if ($.browser.msie && parseFloat($.browser.version) < 10.1) {
            IE8 = true;
        }
    }catch(e){}
    function start(name) {
        var $block = $blocks[name];
        if (!$block) {
            return;
        }
        if (IE8) {
            $block.css('z-index', 10);
            var $pie = $block.find('.x-pie');
            var $icon = $block.find('.x-icon');
            var $h6 = $block.children('.x-wrapper').children('h6');
            var $text = $block.find('.x-text');
            $pie.stop().animate({
                top: '-66px'
            });
            $pie.children('img').stop().animate({
                width: '382px'
            });
            $icon.stop().animate({
                top: '-45px'
            });
            $icon.children('img').stop().animate({
                width: '46px'
            });
            $h6.stop().animate({
                top: '7px'
            });
            $text.stop().animate({
                opacity: '1'
            });
        } else {
            $block.addClass('hover');
        }
    }
    function stop(name) {
        var $block = $blocks[name];
        if (!$block) {
            return;
        }
        $block.removeClass('hover');
        if (IE8) {
            $block.css('z-index', 'auto');
            var $pie = $block.find('.x-pie');
            var $icon = $block.find('.x-icon');
            var $h6 = $block.children('.x-wrapper').children('h6');
            var $text = $block.find('.x-text');
            $pie.stop().animate({
                top: '0'
            });
            $pie.children('img').stop().animate({
                width: '250px'
            });
            $icon.stop().animate({
                top: '50px'
            });
            $icon.children('img').stop().animate({
                width: '126px'
            });
            $h6.stop().animate({
                top: '186px'
            });
            $text.stop().animate({
                opacity: '0'
            });
        }
    }
    var $tip = $section.find('.x-tip');
    $leftActive.hover(function () {
        start('left');
        $tip.html([
            '<em>说明：</em>',
            '<span>帮您建立个人档案，获得您的个人护理医师指导。</span>'
        ].join(''));
    }, function () {
        stop('left');
    });
    $midActive.hover(function () {
        start('mid');
        $tip.html([
            '<em>说明：</em>',
            '<span>帮您建立个人档案，获得您的个人护理医师指导。</span>'
        ].join(''));
    }, function () {
        stop('mid');
    });
    $rightActive.hover(function () {
        start('right');
        $tip.html([
            '<em>说明：</em>',
            '<span>如由于您的主观原因拒收，请您及时与客服人员联系并说明情况。</span>'
        ].join(''));
    }, function () {
        stop('right');
    });
});
// 提问表单
$(function () {
    var $form = $('.question-form');
    var $btn = $form.find('.submit-btn');
    var $mobile = $form.find('input[name=mobile]');
    var locked = false;
    function check() {
        if (!$mobile.val()) {
            layer.msg('请输入联系方式');
            return false;
        }

        return true;
    }
    function clean() {
        $form.find('input').val('');
        $form.find('textarea').val('');
    }
    $btn.click(function () {
        if (!check()) {
            return;
        }
        if (locked) {
            return;
        }
        hmTouch('我要咨询-提交信息');
        locked = true;
        // $.ajax({
        //     type: 'POST',
        //     url: '/active/info.aspx',
        //     data: $form.serialize(),
        //     success: function () {
        //         locked = false;
        //         clean();
        //         layer.alert("您的信息已提交成功，我们的专业医师将会尽快与您联系，请您保持电话畅通！", {
        //             icon: 1,
        //             title: '提交成功'
        //         });
        //     },
        //     error: function () {
        //         locked = false;
        //         layer.msg("提交失败，请稍后再试");
        //     }
        // });
    });
});

// 大事记
$(function () {
    var $section = $('.events-show-section');
    var $wrapper = $section.children('.x-wrapper');
    var $btnbox = $('.events-btn-box');
    var $prev = $btnbox.find('.x-prev');
    var $next = $btnbox.find('.x-next');
    var $points = $wrapper.children('.point');
    var MAX_WIDTH = 3800;
    var timer;
    var stop = function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };
    var step = 10;
    var interval = 30;
    function run() {
        var left = $wrapper.css('margin-left');
        left = parseInt(left, 10) || 0;
        left += step;
        if (step > 0 && left > 0) {
            return;
        }
        var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        if (step < 0 && left < -1080) {
            return;
        }
        $wrapper.css('margin-left', left + 'px');
        timer = setTimeout(run, interval);
    }
    $points.click(function () {
        var index = $points.index(this);
        if (index >= 0) {
            index++;
            // $wrapper.children('.content-' + index).toggleClass('active');
        }
    });
    var keyPressing = false;
    $(document.body).on('keydown', function (e) {
        if (keyPressing) {
            return;
        }
        if (e.keyCode === 37) {
            keyPressing = true;
            step = Math.abs(step);
            run();
        } else if (e.keyCode === 39) {
            keyPressing = true;
            step = Math.abs(step) * -1;
            run();
        }
    });
    $(document.body).on('keyup', function (e) {
        if (e.keyCode === 37) {
            keyPressing = false;
            stop();
        } else if (e.keyCode === 39) {
            keyPressing = false;
            stop();
        }
    });
    $prev.hover(function () {
        step = Math.abs(step);
        run();
    }, stop);
    $next.hover(function () {
        step = Math.abs(step) * -1;
        run();
    }, stop);
});

if ($("body").hasClass("home")) {
    $('.home_show').show();
}