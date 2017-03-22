// scroll
function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassiveOption = true;
            }
        }));
    } catch (e) {}
    return supportsPassiveOption;
}

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, isPassive() ? {
    capture: false,
    passive: false
} : false);

var mainScroll;
var bottomModalScroll;

function loaded() {

    mainScroll = new IScroll('.main', {
        scrollbars: 'custom',
        fadeScrollbars: true,
        shrinkScrollbars: 'scale',
        tap: true,
        click: true
    });

    if (document.querySelector(".bottom-modal-scroll")) {
        bottomModalScroll = new IScroll('.bottom-modal-scroll', {
            scrollbars: 'custom',
            fadeScrollbars: true,
            shrinkScrollbars: 'scale',
            tap: true,
            click: true
        });
    }

}

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
    slideTotapedSlide: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    onTap: function() {
        roleImage.slideTo(roleTab.tapedIndex)
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
    slideTotapedSlide: true,
    lazyLoading: true,
    lazyLoadingInPrevNext: true
});

var roleInfo = new Swiper('#role-info', {
    initialSlide: 1,
    onlyExternal: true
});

roleTab.params.control = [roleInfo];

roleImage.params.control = [roleTab];

// switchery
// var elems = Array.prototype.slice.call(document.querySelectorAll('.switch'));
//
// elems.forEach(function(html) {
//     var switchery = new Switchery(html, {
//         className: 'switch',
//         color: '#53c7c6',
//         secondaryColor: '#f5f6f7',
//         jackColor: '#ffffff',
//         jackSecondaryColor: '#ffffff'
//     });
// });

// waves
Waves.displayEffect();

// delayed spik
function delayedSpik() {

    // var href = [];
    // $("body").find("a.waves-effect").each(function(i) {
    //     href[i] = $(this).attr("href");
    //     $(this).attr("href", "javascript:;");
    //     $(this).bind("tap", function() {
    //         window.setTimeout(function() {
    //             location.href = href[i];
    //         }, 300);
    //     });
    // });

    var href = [];

    $("[data-href]").each(function(i) {
        href[i] = $(this).data('href');
        if ($(this).hasClass('waves-effect')) {
            $(this).bind("tap", function() {
                window.setTimeout(function() {
                    location.href = href[i];
                }, 300);
            });
        } else {
            $(this).bind("tap", function() {
                location.href = href[i];
            });
        }
    });

};

delayedSpik();

// jQuery
jQuery(document).ready(function($) {

    // swiper tab
    $(".tabbar-swiper .item").on('tap', function(e) {
        e.preventDefault()
        $(".tabbar-swiper .active").removeClass('active')
        $(this).addClass('active')
        tabbarSwiperContainer.slideTo($(this).index())
    });

    var tabbarSwiperContainer = new Swiper('.tabbar-swiper-container', {
        autoHeight: true,
        onSlideChangeStart: function() {
            $('.tabbar-swiper .active').removeClass('active')
            $('.tabbar-swiper .item').eq(tabbarSwiperContainer.activeIndex).addClass('active');
        }
    });

    // swiper overflow tab
    var tabbarOverflowSwiper = new Swiper('.tabbar-overflow-swiper', {
        slidesPerView: 3,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        onTap: function() {
            tabbarOverflowSwiperContainer.slideTo(tabbarOverflowSwiper.tapedIndex)
        }
    })

    var tabbarOverflowSwiperContainer = new Swiper('.tabbar-overflow-swiper-container', {
        onSlideChangeStart: function() {
            updateNavPosition()
        }
    })

    function updateNavPosition() {
        $('.tabbar-overflow-swiper .active').removeClass('active')
        var activeNav = $('.tabbar-overflow-swiper .swiper-slide').eq(tabbarOverflowSwiperContainer.activeIndex).addClass('active');
        if (!activeNav.hasClass('swiper-slide-visible')) {
            console.log(1);
            if (activeNav.index() > tabbarOverflowSwiper.activeIndex) {
                console.log(2);
                var thumbsPerNav = Math.floor(tabbarOverflowSwiper.width / activeNav.width()) - 1
                tabbarOverflowSwiper.slideTo(activeNav.index() - thumbsPerNav)
            } else {
                console.log(3);
                tabbarOverflowSwiper.slideTo(activeNav.index())
            }
        }
    }

    // 链接嵌套 fix
    $('.list-button-group .button').on("tap", function(e) {
        e.stopPropagation();
    });

    // searchbar
    $('.searchbar .search').focus(function() {
        $('.searchbar .icon-search').addClass('focus');
        $(this).blur(function() {
            $('.searchbar .icon-search').removeClass('focus');
        })
    })

    // button
    $('.button').on('tap', function() {
        $(this).removeClass('active').addClass('active');
        var set = setTimeout(function() {
            $('.button').removeClass('active');
        }, 100)
    });

    // button wave
    $('.button-wave').on("tap", function() {
        $(this).removeClass('wave').addClass('wave');
        var set = setTimeout(function() {
            $('.button-wave').removeClass('wave');
        }, 500)
    });

    // label
    $('.label-cancel').on('tap', function() {
        $(this).removeClass('active').addClass('active');
        var set = setTimeout(function() {
            $('.label-cancel').removeClass('active');
        }, 100)
    });

    // image lazyload
    $('img.lazyload').lazyload({
        container: $('.main'),
        threshold: 200,
        effect: 'fadeIn'
    });

    // radio
    $('label.item').on('tap', function() {
        $(this).siblings(':radio').prop('checked', false);
        $(this).find(':radio').prop('checked', true);
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
    $(".add-cart").on('tap', function(event) {
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
