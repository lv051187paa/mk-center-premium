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
  // dots: true,
  slidesToShow: 3,
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