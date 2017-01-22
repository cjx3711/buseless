app.controller('homeController', ['$scope', '$location', 'dataService', '$http', function ($scope, $location, dataService, $http) {
  console.log("My stuff");
  $scope.busStopArr = dataService.busStopArr;

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

    var markers = [];
    navigator.geolocation.getCurrentPosition(function(location) {
      console.log(location);
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      console.log(location.coords.accuracy);
      locationCoords = location.coords;
      map.setCenter({lat: locationCoords.latitude, lng: locationCoords.longitude});
      map.setZoom(14);
    }, function() {
      alert("Sorry, no position available");
    });

    var iconConfig = {
      url: 'assets/bus.png',
      labelOrigin: new google.maps.Point(16, 12)
    }

    window.initMaps = function() {
      if ( !window.mapsLoaded ) {
        return;
      }
      map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControlOptions: {
          mapTypeIds: ['mystyle', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN]
        },
        center: {lat: 1.3065978, lng: 103.7733377}, //{lat: 1.36, lng: 103.82},
        zoom: 14,
        mapTypeId: 'mystyle',
        disableDefaultUI: true
      });

      map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'My Style' }));
      // window.marker = new google.maps.Marker({position: {lat: 1.3062, lng: 103.7732}, map: map, icon: iconConfig});
      // window.marker.setLabel('121')
    }
    window.initMaps();

    function updateMarker(lat, lng, no, i) {
      if ( i >= markers.length ) {
        addMarker(lat, lng, no);
      } else {
        markers[i].setLabel(no);
        markers[i].setPosition({lat: lat, lng: lng});
        markers[i].setMap(map);
      }
    }
    function addMarker(lat, lng, no) {
      var newMarker = new google.maps.Marker({position: {lat: lat, lng: lng}, map: map, icon: iconConfig});
      newMarker.setLabel(no);
      markers.push(newMarker);
    }
    function deleteMarkers() {
      markers.forEach( function(m) {
        m.setMap(null);
      });
    }

    function deleteMarkersAfter(n) {
      for ( var i = n; i < markers.length; i++ ) {
        markers[i].setMap(null);
      }
    }

    $scope.busstop = "17099";
    $scope.bus = "151";
    $scope.trackBus = function() {
      console.log("Tracking bus");
      console.log($scope.busstop);
      console.log($scope.bus);
    }
    $scope.selectBusStop = function(stopsArr) {
      dataService.selectedStops = stopsArr;
      window.location.href = "/#/busstop/" + stopsArr[0].BusStopCode;

    };

    var url = '/nextbus/' + $scope.busstop
    $http.get(url).then(
        function successCallback(response) {
          console.log("Server response", response.data)
          $scope.services = response.data;
        },
        function errorCallback(response) {
          console.log("Server error", response.data);
        }
      );


    function updateBusLocations() {
      var locations = [];
      $http({
        method: 'GET',
        url: '/nextbus/17099'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);

        response.data.forEach( function(busService) {
          if ( busService.NextBus.Latitude && busService.NextBus.Longitude ) {
            locations.push({
              num: busService.ServiceNo,
              lat: parseFloat(busService.NextBus.Latitude),
              lng: parseFloat(busService.NextBus.Longitude)
            })
          }
          if ( busService.SubsequentBus.Latitude && busService.SubsequentBus.Longitude ) {
            locations.push({
              num: busService.ServiceNo,
              lat: parseFloat(busService.SubsequentBus.Latitude),
              lng: parseFloat(busService.SubsequentBus.Longitude)
            })
          }
        });

        for ( var i = 0; i < locations.length; i++ ) {
          updateMarker(locations[i].lat, locations[i].lng, locations[i].num, i);
        }
        deleteMarkersAfter(i+1);



        console.log(locations);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("error", response);
      });
    }

    setInterval(updateBusLocations, 5000);


}]);
