$(function() {
    main();

    function main() {
        initSwiper()
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

});
