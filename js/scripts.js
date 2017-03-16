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

// waves
Waves.displayEffect();

// delayed spik
function delayedSpik() {
    var href = [];
    $("body").find("a.waves-effect").each(function(i) {
        href[i] = $(this).attr("href");
        $(this).attr("href", "javascript:;");
        $(this).bind("click", function() {
            window.setTimeout(function() {
                location.href = href[i];
            }, 300);
        });
    });
    var dataHref = [];
    $("div.waves-effect").each(function(i) {
        dataHref[i] = $(this).data('href');
        $(this).bind("click", function() {
            window.setTimeout(function() {
                location.href = dataHref[i];
            }, 300);
        });
    });
};

delayedSpik();

// scroll fix
var overscroll = function(el) {
    el.addEventListener('touchstart', function() {
        var top = el.scrollTop,
            totalScroll = el.scrollHeight,
            currentScroll = top + el.offsetHeight
        if (top === 0) {
            el.scrollTop = 1
        } else if (currentScroll === totalScroll) {
            el.scrollTop = top - 1
        }
    })
    el.addEventListener('touchmove', function(evt) {
        if (el.offsetHeight < el.scrollHeight)
            evt._isScroller = true
    })
}
overscroll(document.querySelector('.main'));
document.body.addEventListener('touchmove', function(evt) {
    if (!evt._isScroller) {
        evt.preventDefault()
    }
})

// jQuery
jQuery(document).ready(function($) {

    // 链接嵌套 fix
    $('.button-group .button').on("click", function(e) {
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
    $('.button').click(function() {
        $(this).removeClass('active').addClass('active');
        var set = setTimeout(function() {
            $('.button').removeClass('active');
        }, 100)
    });

    // button wave
    $('.button-wave').click(function() {
        $(this).removeClass('wave').addClass('wave');
        var set = setTimeout(function() {
            $('.button-wave').removeClass('wave');
        }, 500)
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
