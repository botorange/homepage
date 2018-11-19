$(function() {
    main();

    function main() {
        initSwiper()
        initScroll()
    }

    function initSwiper() {
        var banner = new Swiper('.swiper-container', {
            autoplay: 40000,
            loop: true,
            pagination: '.swiper-container .swiper-pagination',
            paginationClickable: true,
            autoHeight: true
        });
    }

    function initScroll() {
        if(window.innerWidth <= 800) {
            var wrapper3 = document.getElementById('logo-wrapper3');
            wrapper3.scrollTo(230, 0);

            var wrapper2 = document.getElementById('logo-wrapper2');
            wrapper2.scrollTo(30, 0);

            var wrapper1 = document.getElementById('logo-wrapper1');
            wrapper1.scrollTo(30, 0);



        }
    }

});
