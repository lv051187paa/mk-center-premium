$('.header-slider').slick({
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    speed: 2000
});

$(".reviews-text-slider").slick({
    autoplay: true,
    arrows: false,
    dots: true,
    slidesToShow: 1,
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                // slidesToScroll: 1,
                dots: false
            }
        },
    ]
})

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
    input.addEventListener("blur", (event) => {
        if (event.target.value) {
            input.classList.add("is-valid");
        } else {
            input.classList.remove("is-valid");
        }
    });
});


$('.menu')
    .addClass('original').clone().insertAfter('.menu')
    .addClass('cloned')
    .removeClass('original').hide();

scrollIntervalID = setInterval(stickIt, 10);


function stickIt() {

    const orgElement = $('.original');
    const originalElementPos = orgElement.offset();
    const originalElementTop = originalElementPos.top;

    if ($(window).scrollTop() > originalElementTop && !$('.cloned').is(":visible")) {
        const coordsOrgElement = orgElement.offset();
        const widthOrgElement = orgElement.css('width');
        const leftOrgElement = coordsOrgElement.left;
        $('.cloned').css('left',leftOrgElement+'px').css('top',-50).css('width',widthOrgElement).show();
    }

    if ($(window).scrollTop() > originalElementTop + 60) {
        // scrolled past the original position; now only show the cloned, sticky element.

        // Cloned element should always have same left position and width as original element.

        $('.cloned').css('top', 0);
        $('.original').css('visibility','hidden');
    } else {
        // not scrolled past the menu; only show the original menu.
        $('.cloned').hide();
        $('.original').css('visibility','visible');
    }
}
