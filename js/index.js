$(function() {
    main();

    function main() {
        initSwiper()
        initScroll()
        // initAbility()
    }

    function initSwiper() {
      var functionSwiper = new Swiper('.function-content', {
          // autoplay: 40000,
          // loop: true,
          pagination: '.function-content .swiper-pagination',
          paginationClickable: true,
          autoHeight: true
      });

      var functionMobileSwiper = new Swiper('.function-mobile-content', {
        // autoplay: 40000,
        // loop: true,
        pagination: '.function-mobile-content .swiper-pagination',
        paginationClickable: true,
        autoHeight: true
    });
      var ability = new Swiper('.ability-content-container', {
        pagination:'.ability-title-container',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
          var text = '';
          switch(index){
            case 0:text='销售赋能';break;
            case 1:text='社群赋能';break;
            case 2:text='客服赋能';break;
          }
          return '<div class="'+className+'"><div>'+ text + '</div><div class="short-line"></div></div>';
        },
      });
      var allfun = new Swiper('.allfun-mobile-content', {
        // autoplay: 40000,
        // loop: true,
        direction : 'horizontal',
        pagination: '.allfun-mobile-pagination',
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

    function initAbility() {
      $('.ability-title').click(function(){
        $('.ability-title-active').removeClass('ability-title-active');
        $(this).addClass('ability-title-active');
        var key = $(this).data('key');
        $('.ability-content-active').removeClass('ability-content-active');
        $('.ability-content-container [data-key='+key+']').addClass('ability-content-active');
      });
    }
});
