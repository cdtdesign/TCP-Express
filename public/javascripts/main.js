jQuery(document).ready(function ($) {

	$('.my-slider').unslider();

	// hide .navbar first
	$('.navwht').hide();

	// bounce in .navwht
	$(function () {
			$(window).scroll(function () {

					var animationName = 'animated bounceInDown';

					// set distance user needs to scroll before we start fadeIn
					if ($(window).scrollTop() > 400) {
							$('.navbar').fadeOut();
							$('.navwht').show();
							$('.navwht').fadeIn();
							$('.navwht').addClass(animationName);
					} else {
							$('.navwht').removeClass(animationName);
							$('.navwht').fadeOut();
							$('.navbar').fadeIn();
					}
			});
	});

// Image Overlay (Effect-6) .img450
$(document).ready(function(){
    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img450").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img450").hasClass("hover")) {
                $(this).closest(".img450").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".img450").mouseenter(function(){
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function(){
            $(this).removeClass("hover");
        });
    }
});

// Image Overlay (Effect-6) .img300
$(document).ready(function(){
    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img300").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img300").hasClass("hover")) {
                $(this).closest(".img300").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".img300").mouseenter(function(){
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function(){
            $(this).removeClass("hover");
        });
    }
});

// Masonry grid

$('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 300
});




});
