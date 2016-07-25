$(document).ready(function () {

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
          link: 'tcp.fyi/jrnyblg#' + journey_uuid,
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
    var shortlink = $(this).parents('.grid-post').data('shortlink');
    var header_image = "http://beta-express.travelingchildrenproject.com/" + $(this).parents('.grid-post').find('.blogImg').attr('src');
    var tags = $(this).parents('.grid-post').find('.blogHash').text();

    var journey_uuid = $(this).parents('.grid-post').data('journey-uuid');

    var twitter_url = 'https://twitter.com/share?';
    twitter_url += 'text=I+Just+Took+a+' + encodeURI(title) + '%21+' + encodeURI(shortlink);
    twitter_url += '&';
    twitter_url += 'url=tcp.fyi/jrnyblg';
    twitter_url += '&';
    twitter_url += 'hashtags=TravelingChildrenProject,TCPJourneys';
    twitter_url += '&';
    twitter_url += 'via=travelingchildrenproject';

    console.log('twitter_url:', twitter_url);

    return window.open(twitter_url, 'Tweet About This Journey', popupPreferences);
  });

  // Pinterest
  $.getScript('//assets.pinterest.com/js/pinit.js', function() {
    $('.share-with-pinterest').click(function() {
      var journey_uuid = "http://beta-express.travelingchildrenproject.com/blog#" +  $(this).parents('.grid-post').data('journey-uuid');
      var header_image = "http://beta-express.travelingchildrenproject.com/" + $(this).parents('.grid-post').find('.blogImg').attr('src');
      var title = $(this).parents('.grid-post').children('.blogTitle').text();
      var tags = $(this).parents('.grid-post').find('.blogHash').text();

      return PinUtils.pinOne({
        media: header_image,
        url: journey_uuid,
        description: title + ' '+ tags + ' #TravelingChildrenProject #TCPJourneys'
      });
    });
  });

  // Tumblr
  return $('.share-with-tumblr').click(function() {
    var postLink;
    var title = $(this).parents('.grid-post').children('.blogTitle').text();
    var shortlink = $(this).parents('.grid-post').data('shortlink');
    postLink = 'https://www.tumblr.com/share?';
    // postLink += 'shareSource=legacy';
    postLink += '&';
    postLink += 'cononicalUrl=' + encodeURIComponent('http://beta-express.travelingchildrenproject.com/journeyblog');
    postLink += '&';
    postLink += 'posttype=photo';
    postLink += '&';
    postLink += 'tags=TravelingChildrenProject,TCPJourneys';
    postLink += '&';
    postLink += 'content=' + encodeURIComponent(shortlink);
    postLink += '&';
    postLink += 'caption=' + encodeURI(title);
    postLink += '&';
    postLink += 'show-via=travelingchildrenproject';
    return window.open(postLink, 'Post This Journey to Tumblr', popupPreferences);
  });
});
