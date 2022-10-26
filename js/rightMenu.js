var rm = {};
rm.showRightMenu = function (isTrue, x = 0, y = 0) {
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top', x + 'px').css('left', y + 'px');

    if (isTrue) {
        stopMaskScroll()
        $rightMenu.show();
    } else {
        $rightMenu.hide();
    }
};
let rmWidth = $('#rightMenu').width();
let rmHeight = $('#rightMenu').height();
rm.reloadrmSize = function () {
    rmWidth = $("#rightMenu").width();
    rmHeight = $("#rightMenu").height()
};
window.oncontextmenu = function (event) {
    if (document.body.clientWidth > 768) {
        let pageX = event.clientX + 10;	
        let pageY = event.clientY;
        let $rightMenuNormal = $(".rightMenuNormal");
        let $rightMenuOther = $(".rightMenuOther");
        let $rightMenuReadmode = $("#menu-readmode");
        $rightMenuNormal.show();
        $rightMenuOther.show();
        rm.reloadrmSize();
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= rmHeight;
        }
        rm.showRightMenu(true, pageY, pageX);
        $('#rightmenu-mask').attr('style', 'display: flex');
        return false;
    }
};
function removeRightMenu() {
    rm.showRightMenu(false);
    $('#rightmenu-mask').attr('style', 'display: none');
}
function stopMaskScroll() {
    if (document.getElementById("rightmenu-mask")) {
        let xscroll = document.getElementById("rightmenu-mask");
        xscroll.addEventListener("mousewheel", function (e) {
            removeRightMenu();
        }, false);
    };
    if (document.getElementById("rightMenu")) {
        let xscroll = document.getElementById("rightMenu");
        xscroll.addEventListener("mousewheel", function (e) {
            removeRightMenu();
        }, false);
    }
}
/**
 * @name:  切換模式
 */
function switchDarkMode() {
    removeRightMenu();
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode();
        saveToLocal.set('theme', 'dark', 2);
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
    } else {
        activateLightMode();
        saveToLocal.set('theme', 'light', 2);
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
    }
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
};



$('#menu-backward').on('click', function () { window.history.back(); });
$('#menu-forward').on('click', function () { window.history.forward(); });
$('#menu-refresh').on('click', function () { window.location.reload(); });
$('#menu-darkmode').on('click', function () { switchDarkMode() });
$('#menu-home').on('click', function () { window.location.href = window.location.origin; });


$(".menu-link").on("click", function () {
    removeRightMenu()
});
$("#rightmenu-mask").on("click", function () { removeRightMenu() });
$("#rightmenu-mask").contextmenu(function () {
    removeRightMenu();
    return false;
});

// 复制选中文字
rm.copySelect = function(){
    document.execCommand('Copy',false,null);
    // 这句话为什么没有执行？？？
    // btf.snackbarShow("复制成功");
    // $('#menu-text').show();
    removeRightMenu();
}



// {/* <link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/tzy13755126023/BLOG_SOURCE/css/function.min.css"> */}

// 禁用F12
function forbidden_control() {
    $.extend({
        message: function (a) {
            var b = {
                title: "",
                message: "操作成功",
                time: "3000",
                type: "success",
                showClose: !0,
                autoClose: !0,
                onClose: function () { }
            };
            "string" == typeof a && (b.message = a), "object" == typeof a && (b = $.extend({}, b, a));
            var c, d, e, f = b.showClose ? '<div class="c-message--close">×</div>' : "",
                g = "" !== b.title ? '<h2 class="c-message__title">' + b.title + "</h2>" : "",
                h = '<div class="c-message animated animated-lento slideInRight"><i class=" c-message--icon c-message--' + b.type + '"></i><div class="el-notification__group">' + g + '<div class="el-notification__content">' + b.message + "</div>" + f + "</div></div>",
                i = $("body"),
                j = $(h);
            d = function () {
                j.addClass("slideOutRight"), j.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                    e()
                })
            }, e = function () {
                j.remove(), b.onClose(b), clearTimeout(c)
            }, $(".c-message").remove(), i.append(j), j.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                j.removeClass("messageFadeInDown")
            }), i.on("click", ".c-message--close", function (a) {
                d()
            }), b.autoClose && (c = setTimeout(function () {
                d()
            }, b.time))
        }
    }),
        document.onkeydown = function (e) {
            // if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) return $.message({
            //     // message: "采用本站js及css请注明来源，禁止商业使用！",
            //     // title: "你真坏，不能打开控制台喔!",
            //     // type: "error",
            //     // autoHide: !1,
            //     // time: "3000"
            // }), event.keyCode = 0, event.returnValue = !1, !1
            // 修改1
            if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) return event.keyCode = 0, event.returnValue = !1, !1
            
        }, document.oncontextmenu = function () {
            // return $.message({
            //     // message: "采用本站js及css请注明来源，禁止商业使用！",
            //     // title: "不能右键/长按喔！",
            //     // type: "error",
            //     // autoHide: !1,
            //     // time: "3000"
            // }), !1
            //修改2
            return !1

        },
        function () {
            function e() {
                var e = new Date;
                if (new Date - e > 0) {
                    try {
                        document.getElementsByTagName("html")[0].innerHTML = '<div style="width: 100%;height: 50px;font-size: 30px;text-align: center;font-weight: bold;">啊这个网站炸了，<a href="/" style="color:#4285f4;">点击返回</a>试试吧~</div>'
                    } catch (e) { }
                    return document.body.innerHTML = '<div style="width: 100%;height: 50px;font-size: 30px;text-align: center;font-weight: bold;">啊这个网站炸了，<a href="/" style="color:#4285f4;">点击返回</a>试试吧~</div>', !0
                }
                return !1
            }

            function t() {
                for (; e();) e()
            }
            e() ? t() : window.onblur = function () {
                setTimeout(function () {
                    t()
                }, 500)
            }
        }(),
        function () {
            var e = /x/;
            e.toString = function () {
                try {
                    document.getElementsByTagName("html")[0].innerHTML = '<div style="width: 100%;height: 50px;font-size: 30px;text-align: center;font-weight: bold;">啊这个网站炸了，<a href="/" style="color:#4285f4;">点击返回</a>试试吧~</div>'
                } catch (e) { }
                return document.body.innerHTML = '<div style="width: 100%;height: 50px;font-size: 30px;text-align: center;font-weight: bold;">啊这个网站炸了，<a href="/" style="color:#4285f4;">点击返回</a>试试吧~</div>', "禁止打开控制台！"
            }
        }(),
        function () {
            var e = document.createElement("div");
            Object.defineProperty(e, "id", {
                get: function () {
                    try {
                        document.getElementsByTagName("html")[0].innerHTML = '<div style="width: 100%;height: 50px;font-size: 30px;text-align: center;font-weight: bold;">啊这个网站炸了，<a href="/" style="color:#4285f4;">点击返回</a>试试吧~</div>'
                    } catch (e) { }
                    document.body.innerHTML = '<div style="width: 100%;height: 50px;font-size: 30px;text-align: center;font-weight: bold;">啊这个网站炸了，<a href="/" style="color:#4285f4;">点击返回</a>试试吧~</div>'
                }
            }), console.log(e)
        }()
}

// forbidden_control();