$(document).ready(function () {
  console.log('Got it!');

  // Facebook Share
  $.getScript('http://connect.facebook.net/en_US/sdk.js', function() {
    FB.init({
      appId: '1660831194160373',
      version: 'v2.5'
    });
    return FB.getLoginStatus(function(response) {
      return $('.share-with-facebook').click(function() {
        var creator, description, header_image, journey_uuid, title;
        journey_uuid = $(this).parents('.grid-post').data('journey-uuid');
        title = $(this).parents('.grid-post').children('.blogTitle').text();
        creator = $(this).parents('.grid-post').find('.blogTraveler').text();
        header_image = "http://travelingchildrenproject.com" + $(this).parents('.grid-post').find('.blogImg').attr('src');
        console.log(header_image);
        description = $(this).parents('.grid-post').find('.blogBody').text();
        return FB.ui({
          method: 'feed',
          link: 'travelingchildrenproject.com/journeys#' + journey_uuid,
          name: title,
          description: description,
          picture: 'http://travelingchildrenproject.com' + header_image
        });
      });
    });
  });

});
