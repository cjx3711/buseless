app.controller('homeController', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
  console.log("My stuff");
  var myStyle = [
     {
       featureType: "administrative",
       elementType: "labels",
       stylers: [
         { visibility: "off" }
       ]
     },{
       featureType: "poi",
       elementType: "labels",
       stylers: [
         { visibility: "off" }
       ]
     },{
       featureType: "water",
       elementType: "labels",
       stylers: [
         { visibility: "off" }
       ]
     }
   ];

    var map;
    var locationCoords;
    var marker;
    var markerPos = {lat: 1.3062, lng: 103.7732};
    navigator.geolocation.getCurrentPosition(function(location) {
      console.log(location);
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      console.log(location.coords.accuracy);
      locationCoords = location.coords;
      map.setCenter({lat: locationCoords.latitude, lng: locationCoords.longitude});
      map.setZoom(17);
    }, function() {
      alert("Sorry, no position available");
    });

    window.initMaps = function() {
      if ( !window.mapsLoaded ) {
        return;
      }
      map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControlOptions: {
          mapTypeIds: ['mystyle', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN]
        },
        center: {lat: 1.36, lng: 103.82},
        zoom: 11,
        mapTypeId: 'mystyle'
      });

      map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'My Style' }));
      marker = new google.maps.Marker({position: {lat: 1.3062, lng: 103.7732}, map: map, icon: 'assets/bus.png'});
    }
    window.initMaps();

    window.moveMarker = function(lat, lng) {
      markerPos.lat += lat;
      markerPos.lng += lng;
      marker.setPosition(markerPos);
    }
    window.setMarker = function(lat, lng) {
      markerPos.lat = lat;
      markerPos.lng = lng;
      marker.setPosition(markerPos);
    }

    $scope.busstop = "17099";
    $scope.bus = "151";
    $scope.trackBus = function() {
      console.log("Tracking bus");
      console.log($scope.busstop);
      console.log($scope.bus);
    }
}]);
