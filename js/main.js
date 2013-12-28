Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

// Get the size of an object

$( document ).ready(function() {

  var map;
  function initializeMap(country) {
    console.log()
    var mapOptions = {
      zoom: 5,
      center: new google.maps.LatLng(country.lat, country.long),
      styles: [
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]

    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
  }

  function updateInfo(country) {
    $("#info-title h2").text(country.code);
  }

  function pickCountry() {
    $.getJSON( "data/coordinates.json", function( data ) {

      var countries = data;
      console.log(countries);
      var nCountries = Object.size(countries);
      console.log(nCountries);
      var id = Math.floor(Math.random()*nCountries);

      var count = 0;
      var country = null;
      for(var code in countries) {
        if (id == count) {
          var country = countries[code];
          country.code = code;
          break;
        }
        count ++;
      }

      console.log(country);
      updateInfo(country);
      initializeMap(country);
    });
  }

  pickCountry();

  $("#pick-button").on("click", function () {
    pickCountry();
  });

});