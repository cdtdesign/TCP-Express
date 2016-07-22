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
        creator = $(this).parents('.grid-post').children(':last-of-type').children('.blogTraveler').children('em').children('a').text().trim();
        header_image = $(this).parents('.grid-post').children('.blogImg').children('img').attr('src');
        description = $(this).parents('.grid-post').children(':last-of-type').children('.blogBody').text().trim();
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
