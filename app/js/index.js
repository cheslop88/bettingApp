//fix required for bootstrap nav to hide the nav on link click
$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a') && $(e.target).attr('class') !== 'dropdown-toggle') {
        $(this).collapse('hide');
    }
});

//application of an active class to clicked navigation menu item
$(document).on("click", ".navbar li a", function () {
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});

$(document).ready(function() {
  $("#banner").owlCarousel({
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    items : 1, //1 item above 1000px browser width
    itemsDesktop : [1000,1], //1 item between 1000px and 901px
    itemsDesktopSmall : [900,1], // 1 between 900px and 601px
    itemsTablet: [600,1], //1 items between 600 and 0
    itemsMobile : [500, 1]
  });
});