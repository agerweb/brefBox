// 功能：点击图片放大，鼠标滚轮可以缩放图片
// 使用： $(document).brefBox('需要点击的图片的css类名,可以不传')


; (function ($) {
    $.fn.brefBox = function (options) {

        //smallImg
        //后台数据展示一般都在 table中
        var $td = $("table img")
        if (options) {
            $td = $(options)
        }
        var str = '<div class="bigImg20190404" style="z-index:99999999999999999999;display:none;background:rgba(0,0,0,0.6);position: fixed; overflow: hidden; left:0; top:0; width:100%; height:100%;cursor: pointer; display: none; align-items: center;justify-content:center; "><img src="" alt="" style="width:1000px; position: absolute; left:50%;   top:50%; transform: translate(-50%,-50%);"></div>'
        var dom = document.createElement('div')
        document.body.appendChild(dom)
        dom.innerHTML = str;

        var $bigImg = $(".bigImg20190404")

        //兼容性写法，该函数也是网上别人写的，不过找不到出处了，蛮好的，所有我也没有必要修改了
        //判断鼠标滚轮滚动方向
        if (window.addEventListener) {
            //FF,火狐浏览器会识别该方法
            window.addEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = wheel;//W3C
        //统一处理滚轮滚动事件
        function wheel(event) {
            if ($bigImg.css("display") == "block") {

                //禁止页面滚动
                event.preventDefault()
                var delta = 0;
                if (!event) {
                    event = window.event;
                }
                if (event.wheelDelta) {
                    //IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
                    delta = event.wheelDelta / 120;
                    if (window.opera) {
                        delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
                    }
                } else if (event.detail) {
                    //FF浏览器使用的是detail,其值为“正负3”
                    delta = -event.detail / 3;
                }

                if (delta) {
                    handle(delta);
                }


            }

        }
        //上下滚动时的具体处理函数
        function handle(delta) {
            var w = parseInt($bigImg.find("img").css("width"))
            if (delta < 0) {
                //向下滚动
            
                $bigImg.find("img").css("width", w - 10)
            } else {
                //向上滚动
            
                $bigImg.find("img").css("width", w + 10)

            }
        }


        $td.on("click", function () {
            $bigImg.css("display", "block")
            $bigImg.css("width", $(window).width())
            $bigImg.css("height", $(window).height())
            $bigImg.find("img").attr("src", $(this).attr("src"))
            $bigImg.find("img").css("width", 1000)
        })


        $bigImg.on("click", function () {
            $bigImg.css("display", "none")
        })
    }
})(jQuery);