$(document).ready(function () {
  $('.profile-update-button').click(function () {
  	window.onbeforeunload = null;
  });

  // Add Traveler to Passport Profile
	$('.addTravelerButton').click(function (e) {
    addEmptyTraveler($(e.currentTarget).parent('.travelerEdit'));
	});

  // Update the indices for all the travelers
  function updateTravelerIndices() {
    $('.travelers .travelerEdit').each(function (index, traveler) {
      var traveler = $(traveler);

      traveler.attr('data-traveler-index', index);
      traveler.children('.traveler-first-name').attr('name', 'travelers[' + index + '][name]');
      traveler.children('.traveler-birthday').attr('name', 'travelers[' + index + '][birthday]');
      traveler.children('.traveler-gender').attr('name', 'travelers[' + index + '][gender]');
    });
  }

  // Add a new set of traveler fields
  function addEmptyTraveler(afterTraveler) {
    // Clone the traveler where the user clicked the add button
    var emptyTraveler = $(afterTraveler).closest('.travelerEdit').clone();

    // Figure out what the next traveler index should be
    var travelerIndex = $(afterTraveler).parent().data('traveler-index') + 1;

    // Update the index on the new traveler node
    emptyTraveler.attr('data-traveler-index', $(afterTraveler).parent().data('traveler-index') + 1);

    // Add the new traveler after the one that was clicked
    $(afterTraveler).after(emptyTraveler);

    // Reset all the data for the new traveler
    emptyTraveler.children('input').val("");
    emptyTraveler.find('img').attr('src', '/images/profile-images/avatar.jpg');

    // Attach handlers for adding more travelers and deleting this one
    emptyTraveler.children('.deleteTravelerButton').click(function (e) {
      deleteTraveler(emptyTraveler);
    });

    emptyTraveler.children('.addTravelerButton').click(function (e) {
      addEmptyTraveler(emptyTraveler);
  	});

    updateTravelerIndices();
  }

  // Remove a traveler
  function deleteTraveler(traveler) {
    if (confirm('Are you sure you want to delete this traveler?')) {
			$(traveler).remove();
		}

    updateTravelerIndices();
  }

  // Remove travelers from Passport Profile when you click the minus button
	$('.deleteTravelerButton').click(function (e) {
    deleteTraveler($(e.currentTarget).parent());
	});

  // Choose Profile Image link
  $('.parentColumn .passportPicDiv a').click(function (e) {
  	$('.parentColumn [name="profile_img_upload"]').click();
  });

  $('.travelerEdit a').click(function (e) {
  	$(e.target).parents('.travelerEdit').children('[type="file"]').click();
  });

  //Preview image before uploaded in My Passport Profile
  $('.editPassport input[type="file"]').change(function (inputEvent) {
    if (inputEvent.currentTarget.files && inputEvent.currentTarget.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(inputEvent.currentTarget).parent().find('img').attr('src', e.target.result);
      }
      reader.readAsDataURL(inputEvent.currentTarget.files[0]);
    }
  });

  //Confirm exiting My Passport Profile
  function goodbye(e) {
    if(!e) e = window.event;
    //e.cancelBubble is supported by IE - this will kill the bubbling process.
    e.cancelBubble = true;
    e.returnValue = 'Do you really want to leave without updating your changes?'; //This is displayed on the dialog

    //e.stopPropagation works in Firefox.
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
  window.onbeforeunload=goodbye;

  //Unload page changes
  $('.profile-update-button').click(function () {
  	window.onbeforeunload = null;
  });
});
