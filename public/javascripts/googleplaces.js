jQuery(document).ready(function ($) {

  var map;
  var infowindow;
  var service;

  function initMap() {
    var orlando = {lat: 28.5383, lng: -81.3792};

    map = new google.maps.Map(document.getElementById('map'), {
      center: orlando,
      zoom: 10
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    if ("geolocation" in navigator) {
      /* geolocation is available */
      new Promise(function (fulfill, reject) {
        navigator.geolocation.getCurrentPosition(function
          (position) {
            fulfill({lat: position.coords.latitude, lng: position.coords.longitude});
        }, function (err) {
          if (err) reject(err);
        });
      }).then(function (result) {
        map.setCenter(result);
        createMarker(result);
      });
    } else {
      /* geolocation IS NOT available */
      createMarker(orlando);
    }
  }

  initMap();

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place
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
            console.log('Geocoding is complete');
            console.log(JSON.stringify(results));
            // Get extra data
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
        service.textSearch(request, function (places, status) {
          console.log(status);
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(places);

            for (var i=0; i<places.length; i++) {
              var image;
              if (places[i].photos != undefined) {
                image = '<div id="placePhoto"><img src="' + places[i].photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) + '" alt="place photo"></div>';
              } else {
                image = '';
              }
              var hours;
              if (places[i].opening_hours != undefined) {
                var open_message = (places[i].opening_hours.open_now) ? 'Now open!' : 'Sorry, now closed.';
                hours = '<p>' + open_message + '</p>';
              } else {
                hours = '';
              }
              var rating;
              if (places[i].rating != undefined) {
                rating = '<p>';
                for (var r=0; r <= Math.floor(places[i].rating); r++) {
                  rating += '<i class="fa fa-star" id="rateStar" aria-hidden="true"></i>';
                }
                rating += '</p>';
              } else {
                rating = '';
              }
              $('#searchResults').append('<li class="grid-search">' + image + '<h5>' + places[i].name + '</h5><p>' + places[i].formatted_address + '</p>' + hours + rating + '</li>');
            }


            // for (var i=0; i<places.length; i++) {
            //   console.log('place.place_id', places[i].place_id);
            //   service.getDetails({placeId: places[i].place_id}, function (extraPlaceData, status) {
            //     console.log('Got the extra details:', extraPlaceData.opening_hours);
            //     console.log('Extra place data', JSON.stringify(extraPlaceData));
            //   });
            // }

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
          console.log(place);
        }
      });
    }
  });
});
