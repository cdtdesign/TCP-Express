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
        header_image = "http://beta-express.travelingchildrenproject.com/" + $(this).parents('.grid-post').find('.blogImg').attr('src');
        description = $(this).parents('.grid-post').find('.blogBody').text();
        return FB.ui({
          method: 'feed',
          link: 'travelingchildrenproject.com/journeys#' + journey_uuid,
          name: title,
          description: description,
          picture: header_image
        });
      });
    });
  });

  var popupPreferences = 'height=440';
  popupPreferences += ',';
  popupPreferences += 'width=560';
  popupPreferences += ',';
  popupPreferences += 'top=' + ((screen.height / 2) - (600 / 2));
  popupPreferences += ',';
  popupPreferences += 'left=' + ((screen.width / 2) - (560 / 2));

  // Twitter Share

  $('.share-with-twitter').click(function() {
    var title = $(this).parents('.grid-post').children('.blogTitle').text();
    var description = $(this).parents('.grid-post').find('.blogBody').text();
    var header_image = "http://beta-express.travelingchildrenproject.com/" + $(this).parents('.grid-post').find('.blogImg').attr('src');
    $('[name="twitter:title"]').attr('content', title);
    $('[name="twitter:description"]').attr('content', description);
    $('[name="twitter:image"]').attr('content', header_image);

    var journey_uuid = $(this).parents('.grid-post').data('journey-uuid');

    var twitter_url = 'https://twitter.com/share?';
    twitter_url += 'text=Check+out+this+journey+at+TCP%21';
    twitter_url += '&';
    twitter_url += 'url=http%3A%2F%2Ftravelingchildrenproject.com%2Fjourneys%23' + journey_uuid;
    twitter_url += '&';
    twitter_url += 'hashtags=TravelingChildrenProject,TCPJourneys';
    twitter_url += '&';
    twitter_url += 'via=travelingchildrenproject';

    return window.open(twitter_url, 'Tweet About This Journey', popupPreferences);
  });

});
