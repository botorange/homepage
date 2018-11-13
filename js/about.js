$(function() {
    main();

    function main() {
        initSwiper()
        initToggle()
    }

    function initSwiper() {
        var news = new Swiper('.news-swiper', {
            slidesPerView: window.innerWidth > 800 ? 3 : 1,
            spaceBetween: 30,
            pagination: '.news-swiper .swiper-pagination',
            paginationClickable: true,
        });

        window.onresize = function(event) {
            var w = window.innerWidth;
            if (w <= 800) {
                news.params.slidesPerView = 1;
                news.reInit()
                // news.init()
            }
            if (w >= 1000) {
                news.params.slidesPerView = 3;
                news.reInit()
            }
        }

    }

    function initToggle() {

        $(document).ready(function(){
           $(".jobItem .arrowDown").toggle(function(){
            $(this).parent().next('.jobContent').css({
                display: 'block'
            })

            $(this).addClass("rotate");

           },function(){
                let text = $(this).parent().next('.jobContent').css({
                    display: 'none'
                });
            $(this).removeClass("rotate");

            // $(this).removeClass("rotate1");


           });
        });
    }
});
