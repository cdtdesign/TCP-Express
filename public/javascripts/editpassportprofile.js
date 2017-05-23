$(document).ready(function () {
  $('.profile-update-button').click(function () {
  	window.onbeforeunload = null;
  });

  // Add Traveler to Passport Profile
  function attachTravelerAdditionButton() {
  	$('.addTravelerButton').click(function (e) {
      // Clone the traveler where the user clicked the add button
  		var emptyTraveler = $(e.currentTarget).closest('.travelerEdit').clone();

      // Figure out what the next traveler index should be
      var travelerIndex = $(e.currentTarget).parent().data('traveler-index') + 1;

      // Update the index on the new traveler node
      emptyTraveler.data('whyyy', 'travelerIndex');

  		$(e.currentTarget).parent().after(emptyTraveler);
  		emptyTraveler.children('input').val("");
  		emptyTraveler.find('img').attr('src', '/images/profile-images/avatar.jpg');

      // Update the indices on the 'input's
      emptyTraveler.children('.traveler-first-name').attr('name', 'travelers[' + travelerIndex + '][name]');

  		attachTravelerAdditionButton();
  		attachTravelerMinusButton();
  	});
  }
  attachTravelerAdditionButton();

  // Minus Traveler from Passport Profile
  function attachTravelerMinusButton() {
  	$('.deleteTravelerButton').click(function (e) {
  		if (confirm('Are you sure you want to delete this traveler?')) {
  			$(e.currentTarget).parent().remove();
  		}
  	});
  }
  attachTravelerMinusButton();

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
