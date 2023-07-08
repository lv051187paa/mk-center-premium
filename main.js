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

        $(window).resize(function () {
            const widthOrgElement = orgElement.css('width');
            $('.cloned').css('width',widthOrgElement);
        })
    }

    if ($(window).scrollTop() > originalElementTop + 60) {
        $('.cloned').css('top', 0);
        $('.original').css('visibility','hidden');
    } else {
        $('.cloned').hide();
        $('.original').css('visibility','visible');
    }
}

const menu = document.querySelector('.menu-mobile');

$('a[href^="#"]').click(function () {
    menu.classList.remove('active');
    $('body').removeClass("scrollable")
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);

    return false;
});

const btn = menu.querySelector('.nav-tgl');
btn.addEventListener('click', evt => {
    menu.classList.toggle('active');
    $('body').toggleClass("scrollable")
})

// Submit form

// call-me-form
$('#order-form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: 'mail.php',
        data: $(this).serialize(),
        success: function(response)
        {
            var jsonData = JSON.parse(response);

            // user is logged in successfully in the back-end
            // let's redirect
            if (jsonData.success == "1")
            {
                location.href = 'my_profile.php';
            }
            else
            {
                alert('Invalid Credentials!');
            }
        }
    });
});