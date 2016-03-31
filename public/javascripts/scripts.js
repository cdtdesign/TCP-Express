jQuery(document).ready(function ($) {

	$('.my-slider').unslider();

	// hide .navbar first
	$(".navwht").hide();

	// fade in .navbar
	$(function () {
			$(window).scroll(function () {

							 // set distance user needs to scroll before we start fadeIn
					if ($(this).scrollTop() > 400) {
							$('.navwht').fadeIn();
					} else {
							$('.navwht').fadeOut();
					}
			});
	});

	// hide .navbar first
	// $(".navwht").hide();
	//
	// // bounce in down .navbar
	// $(window).scroll(function () {
		// var animationName = 'animated bounceInDown';
		// var animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	//
	// 		// set distance user needs to scroll before we start bounce in
	// 		if ($(this).scrollTop() > 400) {
				// $('.navwht').addClass(animationName).one(animationend, function() {
				// 	$(this).removeClass(animationName);
	//
	// 			});
	// 		} else {
	// 				$('.navwht').fadeOut();
	// 		}
	// });
});


// (function ($) {
//   $(document).ready(function(){
//
//     // hide .navbar first
//     $(".navwht").hide();
//
//     // fade in .navbar
//     $(function () {
//         $(window).scroll(function () {
//
//                  // set distance user needs to scroll before we start fadeIn
//             if ($(this).scrollTop() > 400) {
//                 $('.navwht').fadeIn();
//             } else {
//                 $('.navwht').fadeOut();
//             }
//         });
//     });
//
// });
//   }(jQuery));

// $.fn.extend({
//     animateCss: function ('bounceInDown') {
//         var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
//         $(this).addClass('animated ' + 'bounceInDown').one(animationEnd, function() {
//             $(this).removeClass('animated ' + 'bounceInDown');
//         });
//     }
// });

// (function ($) {
//   $(document).ready(function(){
//
//     // hide .navbar first
//     $(".navwht").hide();
//
//     // fade in .navbar
//     $(function () {
//         $(window).scroll(function () {
//
// 					var animationName = 'animated bounceInDown';
// 					var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
//
//             // set distance user needs to scroll before we start animation
//             if ($(this).scrollTop() > 400) {
// 							$('.navwht').addClass(animationName).one(animationEnd, function() {
// 								$(this).removeClass(animationName);
//             } else {
//                 $('.navwht').fadeOut();
//             }
//         });
//     });
//
// });
//
// });
//   }(jQuery));
