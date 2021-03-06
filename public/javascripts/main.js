$(document).ready(function () {
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

// Dynamically add rows to travelerTable in Passport Profile
	// function addCellsFunction() {
  //   var table = document.getElementById("#travelerTable");
  //   var row = table.insertRow(0);
  //   var cell1 = row.insertCell(0);
  //   var cell2 = row.insertCell(1);
  //   cell1.innerHTML = "{{ user.traveler_name }}";
  //   cell2.innerHTML = "{{ user.traveler_birthday }}";
	// 	cell3.innerHTML = "{{ user.traveler_gender }}";
	// }

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

// https://github.com/drublic/css-modal/blob/master/README.md#events
$(document).on('cssmodal:show', function (e) {
	var currentUrlSplit = window.location.href.split('/');
	var action = window.location.href.split('#')[window.location.href.split('#').length - 1];
	if (action == "update") {
		var journeyId = currentUrlSplit[currentUrlSplit.length - 1].split('#')[0];
		$('#journey-form').attr('action', '/journey/edit')
		$('.journey-create-button').text('Update');
		$('input[name="journeyId"]').val(journeyId);

		// Get Journey ID
		$.ajax({
			url: '/journey/get/' + journeyId,
			success: function (response) {
				console.log('We should have journey data.');
				console.log('response:', response);

				// Format the date for the journey
				console.log('response:', response);
				var date = new Date(response.journey.date);
				var journeyDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate() + 1)).slice(-2);

				console.log('date:', date);
				console.log('journeyDate:', journeyDate);
				$('#journey-title').val(response.journey.title);
				$('#date').val(journeyDate);
				$('#body').val(response.journey.body);
				$('#tags').val(response.journey.tags);
			}
		});
	} else if (action == "create") {
		document.forms[0].reset();
		$('#journey-form').attr('action', '/journey/create')
		$('.journey-create-button').text('Create');
	}
});

// Delete Journey Post
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

});
