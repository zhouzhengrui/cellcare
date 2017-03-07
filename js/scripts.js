// --------------------------------------------- swiper --------------------------------------------- //

// role swiper
var roleTab = new Swiper('#role-tab', {
    effect: 'coverflow',
    coverflow: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 1,
        slideShadows: false
    },
    slidesPerView: 'auto',
    centeredSlides: true,
    setWrapperSize: true,
    initialSlide: 1,
    onlyExternal: true,
    slideToClickedSlide: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    onTap: function() {
        roleImage.slideTo(roleTab.clickedIndex)
    }
});

var roleImage = new Swiper('#role-image', {
    effect: 'coverflow',
    coverflow: {
        rotate: 0,
        stretch: -60,
        depth: 350,
        modifier: 1,
        slideShadows: true
    },
    slidesPerView: 'auto',
    centeredSlides: true,
    initialSlide: 1,
    slideToClickedSlide: true,
    lazyLoading: true,
    lazyLoadingInPrevNext: true
});

var roleInfo = new Swiper('#role-info', {
    initialSlide: 1,
    onlyExternal: true
});

roleTab.params.control = [roleInfo];
roleImage.params.control = [roleTab];

// tab slide
var tabbarSlide = new Swiper('#tabbar-slide', {
    spaceBetween: 10,
    hashnav: true,
    slidesPerView: 'auto'
});

// goods slide
var goodsSlide = new Swiper('#goods-slide', {
    effect: 'coverflow',
    slidesPerView: 'auto',
    lazyLoading: true,
    watchSlidesVisibility: true,
    pagination: '.goods-flow-pagination',
    paginationType: 'fraction',
    coverflow: {
        rotate: 0,
        stretch: -10,
        depth: 0,
        modifier: 1,
        slideShadows: false
    }
});

// list slide
var listSlide = new Swiper('.list-slide', {
    slidesOffsetAfter: 100
});

// address slide
var addressSlide = new Swiper('.address-slide', {
    slidesOffsetAfter: 150
});

// calendar
var calendarSlide = new Swiper('#calendar-slide', {
    effect: 'coverflow',
    slidesPerView: 'auto',
    hashnav: true,
    freeMode: true,
    freeModeSticky: true,
    coverflow: {
        rotate: 0,
        depth: 0,
        slideShadows: false
    }
});

// switchery
var elems = Array.prototype.slice.call(document.querySelectorAll('.switch'));
elems.forEach(function(html) {
    var switchery = new Switchery(html, {
        className: 'switch',
        color: '#53c7c6',
        secondaryColor: '#f5f6f7',
        jackColor: '#ffffff',
        jackSecondaryColor: '#ffffff'
    });
});

jQuery(document).ready(function($) {

    // touch
    touch.on('a.group', 'tap', function() {
        $(this).addClass('active');
    });

    // image lazyload
    $('img.lazyload').lazyload({
        container: $('.main'),
        threshold: 200,
        effect: 'fadeIn'
    });

    // radio-checkbox
    $('.radio-checkbox').iCheck({
        checkboxClass: 'checkbox',
        radioClass: 'radio',
    });

    // fly
    var resetOffset = function() {
        var offset = $("#cart").offset();
        if (offset == null) {
            return;
        }
        if ($(window).height() < offset.top) {
            offset.top = $("#cart").offset().top - $(document).scrollTop();
        }
        return offset;
    }
    var offset = resetOffset();
    window.onresize = function() {
        offset = resetOffset(offset);
    }
    $(".add-cart").click(function(event) {
        var flag = false;
        var addCart = $(this);
        var flyer = $('<div class="flyer"></div>');
        flyer.fly({
            speed: 1.2,
            start: {
                left: event.clientX - 25,
                top: event.clientY - 25
            },
            end: {
                left: offset.left + 12,
                top: offset.top + 12,
                width: 0,
                height: 0
            },
            onEnd: function() {
                var i = parseInt($("#cart-badge").html());
                $("#cart-badge").html(i + 1);
                $("#cart-badge").addClass('animated bounceIn').one('webkitAnimationEnd animationend', function() {
                    $(this).removeClass('animated bounceIn');
                });
            }
        });
    });

});
