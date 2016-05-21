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
$(window).on('load resize', function() {
	return $('.journeys-grid').masonry({
		itemSelector: '.grid-post',
		columnWidth: 300,
		gutter: 30
	});

});

$(window).on('load resize', function() {
	return $('.search-grid').masonry({
		itemSelector: '.grid-search',
		columnWidth: 400,
		gutter: 30
	});

});

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-77240174-1', 'auto');
ga('send', 'pageview');


// Removal of Facebook's #_=_
if (window.location.hash && window.location.hash == '#_=_') {
  window.location.hash = '';
}

$("#addJourneyButton").click(function(){
	var SM = new SimpleModal({
		"btn_ok": "Confirm button",
		overlayClick: true,
		overlayOpacity: .875,
		overlayColor: '#9DDCF9'
	});
  SM.show({
    "model":"modal",
    "title":"Add New Journey Post",
    "contents":'\
				<form class="journeyForm" id="journey-form" method="POST" action="/journey/create"></form> \
				<h4>TC Journey to...</h4> \
				<input form="journey-form" class="journey-title" type="text" name="title" placeholder="Enter Journey Post Title…" autocomplete="off" required> \
				<label for="date">When did this journey happen?</label> \
				<input form="journey-form" id="date" type="date" name="date" class="form-control" autocomplete="on" autocomplete="off" required> \
				<label for="body">What did you do there?</label> \
				<textarea form="journey-form" id="body" rows="10" name="body" class="form-control" placeholder="Body..." autocomplete="off" required></textarea> \
				<label for="tags">Choose some tags to help others easily find this journey.</label> \
				<input form="journey-form" id="tags" type="text" name="tags" class="form-control" value="#HappyTravels #TravelingChristian" placeholder="#One #Two #Red #Blue" autocomplete="off" required> \
				<label for="photo">Is there a photo you took while you were there?</label> \
				<input form="journey-form" id="photo" type="file" name="header_image" class="input-group" accept="image/*">',
		"footer":'\
			<input form="journey-form" type="submit" class="button button-primary journeyUpdateButton" value="Create"> \
			<input form="journey-form" type="button" class="button-outline journeyCancelButton" value="Cancel">'
  });
});

$(".journeyEditButton").click(function (e) {
	$.ajax({
		url: '/journey/get/' + $(e.target).data('journey-id'),
		success: function (response) {
			console.log('We should have journey data.');
			console.log('response:', response);

			// Format the date for the journey
			var date = new Date(response.journey.date);
			var journeyDate = ("0" + date.getFullYear()).slice(-4) + '-' + ("0" + date.getMonth()).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);

			// Show the modal with the returned form data
			var SM = new SimpleModal({
				"btn_ok": "Confirm button",
				overlayClick: true,
				overlayOpacity: .875,
				overlayColor: '#9DDCF9'
			});
			SM.show({
				"model":"modal",
				"title":"Edit Journey Post",
				"contents":'\
					<form class="journeyForm" id="journey-form" method="POST" action="/journey/edit"></form> \
						<h4>TC Journey to...</h4> \
						<input form="journey-form" type="hidden" name="journeyId" value="' + $(e.target).data('journey-id') + '"> \
						<input form="journey-form" value="' + response.journey.title + '" class="journey-title" type="text" name="title" placeholder="Enter Journey Post Title…" autocomplete="off" required> \
						<label for="date">When did this journey happen?</label> \
						<input form="journey-form" value="' + journeyDate + '" id="date" type="date" name="date" class="form-control" autocomplete="on" autocomplete="off" required> \
						<label for="body">What did you do there?</label> \
						<textarea form="journey-form" id="body" rows="10" name="body" class="form-control" placeholder="Body..." autocomplete="off" required>' + response.journey.body + '</textarea> \
						<label for="tags">Choose some tags to help others easily find this journey.</label> \
						<input value="' + response.journey.tags.toString() + '" form="journey-form" id="tags" type="text" name="tags" class="form-control" value="#HappyTravels #TravelingChristian" placeholder="#One #Two #Red #Blue" autocomplete="off" required> \
						<label for="photo">Is there a photo you took while you were there?</label> \
						<input form="journey-form" id="photo" type="file" name="header_image" class="input-group" accept="image/*">',
				"footer":'\
					<input form="journey-form" type="submit" class="button button-primary journeyUpdateButton" value="Update"> \
					<input form="journey-form" type="button" class="button-outline journeyCancelButton" value="Cancel">'
			});
		}
	});
});

$(".journeyDeleteButton").click(function (e) {
	$.ajax({
		url: '/journey/delete/' + $(e.target).data('journey-id'),
		success: function (response, status) {
			if (status == "success") {
				// The journey was deleted; Delete it
				$('.journeys-grid').masonry('remove', $(e.target).closest('.grid-post')).masonry();
			}
		}
	});
});

$('.journeyCancelButton').click(function () {
	$('.simple-modal').hide();
});

});
