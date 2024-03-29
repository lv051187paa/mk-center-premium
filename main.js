const getReviewItemTemplate = (name, comment, email) => `
    <div class="reviews-text-slider-item">
      <div class="reviews-text-slider-item-title">
        ${name}
      </div>
      <div class="reviews-text-slider-item-content">
        "${comment}"
      </div>
      <div class="reviews-text-slider-item-link">
        ${email}
      </div>
    </div>
`

const runReviewsSlider = (shouldShowDots) => {
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
                    dots: shouldShowDots
                }
            },
        ]
    })
}

const setCurrentYear = () => {
    const date = new Date();
    $('#year').text(date.getFullYear());
}

setCurrentYear();
$('#educationModal').modal('show');

$('.header-slider').slick({
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    speed: 2000
});

const inputs = document.querySelectorAll("input, textarea");
inputs.forEach((input) => {
    input.addEventListener("blur", (event) => {
        if (event.target.value) {
            input.classList.add("is-valid");
        } else {
            if(!input.inputmask) {
                input.classList.remove("is-valid");
            }
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

jQuery.validator.addMethod("ua-phone", function(value, element) {
    return this.optional(element) || /^[(]?[0-9]{3}[)]?\s?[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(value);
}, "Ой, здається Ви допустили помилку в телефоні");

const commonValidationOptions = {
    errorElement: "div",
    errorPlacement: function(error, element) {
        error.appendTo( element.closest(".input-container") );
    },
}


$("#order-form").validate({
    rules: {
        name: "required",
        phone: {
            required: true,
            "ua-phone": true,
        },
        time: "required",
    },
    messages: {
        name: {
            required: "Вкажіть як Вас звати",
        },
        phone: {
            required: "Ви забули вказати номер телефону",
        },
        time: {
            required: "Оберіть тривалість масажу",
        }
    },
    ...commonValidationOptions,
    submitHandler: function(form) {
        $.ajax({
            type: "POST",
            url: 'mail/sendMassageRequest',
            data: $(form).serialize(),
            success: function(response){
                if (response.success) {
                    form.reset();
                    $(".is-valid").removeClass("is-valid");
                    $.toast({
                        heading: 'Ви це зробили!',
                        text: 'Вітаємо! Ваше повідомлення відправлено',
                        showHideTransition: 'slide',
                        icon: 'success'
                    })
                } else {
                    $.toast({
                        heading: 'Ой, щось пішло не так!',
                        text: 'Але Ви все рівно можете залишити заявку на масаж за цим <a href="https://widget.client.appointer.com.ua/uk/centerpreviummk?fbclid=PAAaaBqtnK_qFSt-SzhXC24bGPRDLkt59OQ82fylYKTocUjbQHQeRi2XQ07TE_aem_AdVK3WirVoxq0hfmoM96UJt_umYVFLnjXae-38WyEbux_Fjs5ikYQggmBkniOPBx3kA">посиланням</a>',
                        showHideTransition: 'fade',
                        icon: 'error',
                        hideAfter: 5000,
                    })
                }
            }
        });
    }
});


$("#call-me-form").validate({
    rules: {
        name: "required",
        phone: {
            required: true,
            "ua-phone": true,
        },
    },
    messages: {
        name: {
            required: "Вкажіть як Вас звати",
        },
        phone: {
            required: "Ви забули вказати номер телефону",
        },
    },
    ...commonValidationOptions,
    submitHandler: function(form) {
        $.ajax({
            type: "POST",
            url: 'mail/sendCallRequest',
            data: $(form).serialize(),
            success: function (response) {
                if (response.success) {
                    form.reset();
                    $(".is-valid").removeClass("is-valid");
                    $('#callMeModal').modal('hide')
                    $.toast({
                        heading: 'Ви це зробили!',
                        text: 'Вітаємо! Найближчим часом ми Вам зателефонуємо',
                        showHideTransition: 'slide',
                        icon: 'success'
                    })
                } else {
                    $.toast({
                        heading: 'Ой, щось пішло не так!',
                        text: 'Але Ви все рівно можете зв\'язатись з нами за цим <a href="https://instagram.com/mk_center_premium?igshid=MTIzZWMxMTBkOA==">посиланням в Instagram</a>',
                        showHideTransition: 'fade',
                        icon: 'error',
                        hideAfter: 5000,
                    })
                }
            }
        })
    }

});

$("#education-form").validate({
    rules: {
        name: "required",
        phone: {
            required: true,
            "ua-phone": true,
        },
    },
    messages: {
        name: {
            required: "Вкажіть як Вас звати",
        },
        phone: {
            required: "Ви забули вказати номер телефону",
        },
    },
    ...commonValidationOptions,
    submitHandler: function(form) {
        $.ajax({
            type: "POST",
            url: 'mail/sendEducationRequest',
            data: $(form).serialize(),
            success: function (response) {
                if (response.success) {
                    form.reset();
                    $(".is-valid").removeClass("is-valid");
                    $('#educationModal').modal('hide')
                    $.toast({
                        heading: 'Ви це зробили!',
                        text: 'Вітаємо! Найближчим часом ми Вам зателефонуємо',
                        showHideTransition: 'slide',
                        icon: 'success'
                    })
                } else {
                    $.toast({
                        heading: 'Ой, щось пішло не так!',
                        text: 'Але Ви все рівно можете зв\'язатись з нами за цим <a href="https://instagram.com/mk_center_premium?igshid=MTIzZWMxMTBkOA==">посиланням в Instagram</a>',
                        showHideTransition: 'fade',
                        icon: 'error',
                        hideAfter: 5000,
                    })
                }
            }
        })
    }

});

$('input[type="tel"]').focus(function() {
    $(this).addClass("is-valid")
    $(this).inputmask('(099) 999-99-99')
});

$.ajax({
    type: "GET",
    url: 'review/index',
    // data: $(form).serialize(),
    success: function(response){
        const reviews = response.data.map(({ name, email, review_text }) => getReviewItemTemplate(name, review_text, email));

        $('.reviews-text-slider').html(reviews);
        runReviewsSlider(response.data.length > 3);
    }
});

$("#review-form").validate({
    rules: {
        "review-name": "required",
        "review-comments": {
            required: true,
            maxlength: 100,
        },
        "review-email": {
            required: true,
            email: true
        },
    },
    messages: {
        "review-name": {
            required: "Вкажіть як Вас звати",
        },
        "review-comments": {
            required: "Залиште свій відгук",
            maxlength: $.validator.format("Максимальна довжина повідомлення {0} символів")
        },
        "review-email": {
            required: "Ви забули вказати електронну пошту",
            email: "Ви невірно вказали електронну адресу",
        },
    },
    ...commonValidationOptions,
    submitHandler: function(form) {
        $.ajax({
            type: "POST",
            url: 'review/store',
            data: $(form).serialize(),
            success: function (response) {
                console.log(response)
                if (response.success) {
                    const reviews = response.data.map(({ name, email, review_text }) => getReviewItemTemplate(name, review_text, email));

                    $('.reviews-text-slider').slick('unslick');
                    $('.reviews-text-slider').html(reviews);
                    runReviewsSlider(response.data.length > 3);
                    // $(".reviews-text-slider").slick('refresh');
                    form.reset();
                    $(".is-valid").removeClass("is-valid");

                    $.toast({
                        heading: 'Ваш відгук збережено!',
                        text: 'Вітаємо! Тепер Ваш відгук доданий',
                        showHideTransition: 'slide',
                        icon: 'success'
                    })
                } else {
                    $.toast({
                        heading: 'Ой, щось пішло не так!',
                        text: 'Але Ви все рівно можете зв\'язатись з нами за цим <a href="https://instagram.com/mk_center_premium?igshid=MTIzZWMxMTBkOA==">посиланням в Instagram</a>',
                        showHideTransition: 'fade',
                        icon: 'error',
                        hideAfter: 5000,
                    })
                }
            }
        })
    }

});
