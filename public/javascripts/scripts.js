jQuery(document).ready(function ($) {

	$('.my-slider').unslider();

	// hide .navbar first
	$(".navwht").hide();

	// fade in .navbar
	$(function () {
			$(window).scroll(function () {

					var animationName = 'animated bounceInDown';

							 // set distance user needs to scroll before we start fadeIn
					if ($(window).scrollTop() > 400) {
							$('.navbar').fadeOut();
							$(".navwht").show();
							$('.navwht').fadeIn();
							$('.navwht').addClass(animationName);
					} else {
							$('.navwht').removeClass(animationName);
							$('.navwht').fadeOut();
							$('.navbar').fadeIn();
					}
			});
	});
});
