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
        journey_uuid = $(this).parents('.journeyPost').data('journey-uuid');
        title = $(this).parents('.journeyPost').children(':first-of-type').children('.jp_title').children('span').text();
        creator = $(this).parents('.journeyPost').children(':last-of-type').children('.jp_fname_date').children('em').children('a').text().trim();
        header_image = $(this).parents('.journeyPost').children('.jp_img').children('img').attr('src');
        description = $(this).parents('.journeyPost').children(':last-of-type').children('.jp_body').text().trim();
        return FB.ui({
          method: 'feed',
          link: 'travelingchildrenproject.com/journeys#' + journey_uuid,
          name: creator + '\'s Journey to ' + title,
          description: description,
          picture: 'http://travelingchildrenproject.com' + header_image
        });
      });
    });
  });

});
