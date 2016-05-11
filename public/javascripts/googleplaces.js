jQuery(document).ready(function ($) {

  var map;
  var infowindow;
  var service;

  function initMap() {
    var pyrmont = {lat: -33.867, lng: 151.195};

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 500,
      type: ['store']
    }, callback);
  }

  initMap();

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  $('#destinationSearch').submit(function (e) {
    e.preventDefault();

    var formData = $(this).serializeArray();
    var googlePlacesQuery;

    googlePlacesQuery = formData[0].value;

    console.log(formData);

    var request = {
      query: googlePlacesQuery,
      minPriceLevel: parseInt(formData[3].value),
      maxPriceLevel: parseInt(formData[3].value)
    };

    console.log(request);

    if (formData[1].value != 'All') {
      request.type = formData[1].value;
    }

    if (formData[2].value != "") {
      new Promise(function (fulfill, reject) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': formData[2].value}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log('Geocoding is complete')
            console.log(JSON.stringify(results));
            // Get extra data
            service = new google.maps.places.PlacesService();
            service.getDetails({placeId: results[0].placeId})
            fulfill(results[0].geometry.location);
          } else {
            reject(status);
          }
        });
      }).then(function (result) {
        var lat = result.lat();
        var lng = result.lng();
        request.radius = 50000;
        request.rankBy = google.maps.places.RankBy.DISTANCE;
        request.location = new google.maps.LatLng(lat, lng);
        service.textSearch(request, function (place, status) {
          console.log(status);
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log('First one', place);
            var marker = new google.maps.Marker({
              map: map,
              position: request.location
            });
          }
        });
      });
    } else {
      service.textSearch(request, function (place, status) {
        console.log(status);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log('Second one', place);
        }
      });
    }
  });
});
