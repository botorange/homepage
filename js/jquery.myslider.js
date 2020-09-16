(function ($) {
  $.fn.myslider = function (option) {
    var timer;
    var resizeTime;
    var resizeTimeout = false;
    var delta = 200;
    var myOption = {
      margin: option.margin || 20,
      currentIndex: option.currentIndex || 0,
      interval: option.interval || 2000,
      children: jQuery(this).children(),
      changed: option.changed,
      top: option.top || 30,
    };
    var _this = this;

    var init = function() {
      myOption.parentWidth = _this.parent().width();
      myOption.itemWidth = _this.children().first().width();
      myOption.leftDisplayCount = Math.ceil((myOption.parentWidth - myOption.itemWidth) / (2 * (myOption.itemWidth + myOption.margin)));
      var currentLeft = (myOption.parentWidth / 2) - (myOption.itemWidth / 2);
      setCss(myOption.children.eq(myOption.currentIndex), 0, currentLeft);
      for (let i = 0; i < myOption.leftDisplayCount; i++) {
        var preIndex = (myOption.currentIndex - 1 - i);
        if (preIndex < 0) {
          preIndex = preIndex + myOption.children.length;
        }
        var preLeft = currentLeft - (i + 1) * (myOption.itemWidth + myOption.margin);
        setCss(myOption.children[preIndex], myOption.top, preLeft);
      }
      for (let i = 0; i < (myOption.children.length - myOption.leftDisplayCount - 1); i++) {
        var nextIndex = (myOption.currentIndex + 1 + i);
        if (nextIndex >= myOption.children.length) {
          nextIndex = nextIndex - myOption.children.length;
        }
        var nextLeft = currentLeft + (i + 1) * (myOption.itemWidth + myOption.margin);
        setCss(myOption.children[nextIndex], myOption.top, nextLeft);
      }
      if (myOption.changed) {
        myOption.changed(myOption.currentIndex);
      }
      timer = setTimeout(function() {
        var currentIndex = myOption.currentIndex;
        var nextIndex = currentIndex + 1;
        if (nextIndex === myOption.children.length) {
          nextIndex = 0;
        }
        // myOption.currentIndex = currentIndex;
        preClick(nextIndex);
        setIndex(nextIndex);
      }, myOption.interval);
    };
    init();

    var setIndex = function(newIndex) {
      clearTimeout(timer);
      var currentLeft = (myOption.parentWidth / 2) - (myOption.itemWidth / 2);
      var el = myOption.children.eq(newIndex);
      // var currentEl = myOption.children.eq(oldIndex);
      var elLeft = parseInt(el.css('left').replace('px', ''), 10);
      // var currentLeft = parseInt(currentEl.css('left').replace('px', ''), 10);
      var temp = Math.ceil((elLeft - currentLeft) / (myOption.itemWidth + myOption.margin));
      var leftOrRight = temp > 0;
      var moveCount = Math.abs(temp);
      setCss(myOption.children.eq(newIndex), 0, currentLeft);
      myOption.currentIndex = newIndex;
      if (myOption.changed) {
        myOption.changed(newIndex);
      }
      if (leftOrRight) {
        setPre(elLeft, myOption.leftDisplayCount + moveCount, leftOrRight);
        setNext(elLeft, myOption.leftDisplayCount, leftOrRight);
      } else {
        setPre(elLeft, myOption.leftDisplayCount, leftOrRight);
        setNext(elLeft, myOption.leftDisplayCount + moveCount, leftOrRight);
      }
      timer = setTimeout(function() {
        var currentIndex = myOption.currentIndex;
        var nextIndex = currentIndex + 1;
        if (nextIndex === myOption.children.length) {
          nextIndex = 0;
        }
        // myOption.currentIndex = currentIndex;
        preClick(nextIndex);
        setIndex(nextIndex);
      }, myOption.interval);
    };
    var setPre = function(startLeft, moveCount, moveDrection) {
      var currentLeft = (myOption.parentWidth / 2) - (myOption.itemWidth / 2);
      for (let i = 0; i < moveCount; i++) {
        var preIndex = (myOption.currentIndex - 1 - i);
        if (preIndex < 0) {
          preIndex = preIndex + myOption.children.length;
        }
        var preLeft;
        if (moveDrection) {
          preLeft = currentLeft - (i + 1) * (myOption.itemWidth + myOption.margin);
        } else {
          preLeft = currentLeft - (i + 1) * (myOption.itemWidth + myOption.margin);
        }
        setCss(myOption.children[preIndex], myOption.top, preLeft);
      }

      // var preCount = Math.ceil((myOption.parentWidth - myOption.itemWidth) / (2 * (myOption.itemWidth + myOption.margin))) + 1;
      // var currentLeft = (myOption.parentWidth / 2) - (myOption.itemWidth / 2);
      // for (let i = 0; i < preCount; i++) {
      //   var preIndex = (myOption.currentIndex - 1 - i);
      //   if (preIndex < 0) {
      //     preIndex = preIndex + myOption.children.length;
      //   }
      //   var preLeft = currentLeft - (i + 1) * (myOption.itemWidth + myOption.margin);
      //   setCss(myOption.children[preIndex], 30, preLeft);
      // }
    };
    var setNext = function(startLeft, moveCount, moveDrection) {
      var currentLeft = (myOption.parentWidth / 2) - (myOption.itemWidth / 2);
      for (let i = 0; i < moveCount; i++) {
        var nextIndex = (myOption.currentIndex + 1 + i);
        if (nextIndex >= myOption.children.length) {
          nextIndex = nextIndex - myOption.children.length;
        }
        var nextLeft;
        if (moveDrection) {
          nextLeft = currentLeft + (i + 1) * (myOption.itemWidth + myOption.margin);
        } else {
          nextLeft = currentLeft + (i + 1) * (myOption.itemWidth + myOption.margin);
        }
        setCss(myOption.children[nextIndex], myOption.top, nextLeft);
      }
      // var preCount = Math.ceil((myOption.parentWidth - myOption.itemWidth) / (2 * (myOption.itemWidth + myOption.margin))) + 1;
      // var nextCount = myOption.children.length - preCount - 1;
      // // var nextCount = Math.floor((myOption.children.length - 1) / 2);
      // var currentLeft = (myOption.parentWidth / 2) - (myOption.itemWidth / 2);
      // for (let i = 0; i < nextCount; i++) {
      //   var nextIndex = (myOption.currentIndex + 1 + i);
      //   if (nextIndex >= myOption.children.length) {
      //     nextIndex = nextIndex - myOption.children.length;
      //   }
      //   var nextLeft = currentLeft + (i + 1) * (myOption.itemWidth + myOption.margin);
      //   var nextDirectly = false;
      //   if (i === (nextCount - 1)) {
      //     nextDirectly = true;
      //   }
      //   setCss(myOption.children[nextIndex], 30, nextLeft, nextDirectly);
      // }
    }
    // setIndex(myOption.currentIndex, myOption.currentIndex);

    var preClick = function(clickIndex) {
      var el = myOption.children.eq(clickIndex);
      var currentEl = myOption.children.eq(myOption.currentIndex);
      var elLeft = parseInt(el.css('left').replace('px', ''), 10);
      var currentLeft = parseInt(currentEl.css('left').replace('px', ''), 10);
      //分清左右以后，把el的左边或右边提前填充好元素
      var temp = Math.ceil((elLeft - currentLeft) / (myOption.itemWidth + myOption.margin));
      var leftOrRight = temp > 0;
      var processCount = myOption.leftDisplayCount;
      if (leftOrRight) {
        for (let j = 1; j < processCount + 1; j++) {
          var jIndex = clickIndex + j;
          if (jIndex >= myOption.children.length) {
            jIndex = jIndex - myOption.children.length;
          }
          var jLeft = elLeft + (j * (myOption.itemWidth + myOption.margin));
          setCss(myOption.children.eq(jIndex), myOption.top, jLeft, true);
        }
      } else {
        for (let j = 1; j < processCount + 1; j++) {
          var jIndex = clickIndex - j;
          if (jIndex < 0) {
            jIndex = jIndex + myOption.children.length;
          }
          var jLeft = elLeft - (j * (myOption.itemWidth + myOption.margin));
          setCss(myOption.children.eq(jIndex), myOption.top, jLeft, true);
        }
      }
    };
    for (let ei = 0; ei < myOption.children.length; ei++) {
      myOption.children.eq(ei).click(function(){
        var eIndex = jQuery(this).index();
        if (eIndex === myOption.currentIndex) {
          return;
        }
        preClick(eIndex);
        // myOption.currentIndex = eIndex;
        setIndex(eIndex);
      });
    }

    var resizeEnd = function() {
      if (new Date() - resizeTime < delta) {
        setTimeout(resizeEnd, delta);
      } else {
        resizeTimeout = false;
        clearTimeout(timer);
        init();
      }
    };
    jQuery(window).resize(function(){
      resizeTime = new Date();
      if (resizeTimeout === false) {
        resizeTimeout = true;
        setTimeout(resizeEnd, delta);
      }
      // init();
      // setIndex(myOption.currentIndex);
    });
    function setCss(el, top, left, directly) {
      if (directly) {
        jQuery(el).css('transition', 'top 0s, left 0s');
        jQuery(el).css('-webkit-transition', 'top 0s, left 0s');
        jQuery(el).css('top', top);
        jQuery(el).css('left', left);
      } else {
        jQuery(el).css('transition', 'top 1s, left 1s');
        jQuery(el).css('-webkit-transition', 'top 1s, left 1s');
        
        jQuery(el).css('top', top);
        jQuery(el).css('left', left);
        // jQuery(el).animate({
        //   top: top,
        //   left: left,
        // }, 1000);
        // jQuery(el).velocity({
        //   top: top,
        //   left: left,
        // }, {
        //   duration: 1000,
        // });
      }
      // jQuery(el).css('top', top);
      // jQuery(el).css('left', left);
    }
  }
})(jQuery);