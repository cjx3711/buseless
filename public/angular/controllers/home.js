app.controller('homeController', ['$scope', '$location', 'dataService', '$http', function ($scope, $location, dataService, $http) {
  console.log("My stuff");
  $scope.busStopArr = [
    {
      "RoadName": "Clementi Ave 1",
      "Stops": [
        {
          "BusStopCode": "16991",
          "RoadName": "Clementi Ave 1",
          "Description": "Opp Nan Hua High Sch",
          "Latitude": 1.30777929773028,
          "Longitude": 103.76988582423061
        }
      ]
    },
    {
      "RoadName": "Clementi Rd",
      "Stops": [
        {
          "BusStopCode": "17091",
          "RoadName": "Clementi Rd",
          "Description": "Aft Clementi Ave 1",
          "Latitude": 1.3090313954164,
          "Longitude": 103.77153500824593
        },
        {
          "BusStopCode": "17099",
          "RoadName": "Clementi Rd",
          "Description": "Aft Dover Rd",
          "Latitude": 1.30798165844336,
          "Longitude": 103.77170498369206
        }
      ] 
    },
    {
      "RoadName": "C'wealth Ave West",
      "Stops": [
        {
          "BusStopCode": "19031",
          "RoadName": "C'wealth Ave West",
          "Description": "Dover Stn",
          "Latitude": 1.31123416666912,
          "Longitude": 103.77838361113201
        },  
        {
          "BusStopCode": "19039",
          "RoadName": "C'wealth Ave West",
          "Description": "Dover Stn",
          "Latitude": 1.31167951129602,
          "Longitude": 103.77868390552867
        }
      ]
    },
    {
      "RoadName": "C'wealth Ave West",
      "Stops": [
        {
          "BusStopCode": "19041",
          "RoadName": "C'wealth Ave West",
          "Description": "Opp Sch Of Science & Tech",
          "Latitude": 1.31235972197855,
          "Longitude": 103.77552750001337
        },
        {
          "BusStopCode": "19049",
          "RoadName": "C'wealth Ave West",
          "Description": "Sch Of Science & Tech",
          "Latitude": 1.31266302174215,
          "Longitude": 103.77479215922537
        }
      ]
    },
    {
      "RoadName": "C'wealth Ave West",
      "Stops": [    
        {
          "BusStopCode": "19051",
          "RoadName": "Dover Rd",
          "Description": "New Town Sec Sch",
          "Latitude": 1.30896444398008,
          "Longitude": 103.77392333299538
        },
        {
          "BusStopCode": "19059",
          "RoadName": "Dover Rd",
          "Description": "University Town",
          "Latitude": 1.30894500001531,
          "Longitude": 103.7727225000061
        }
      ]
    }        
  ];





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
      map.setZoom(17);
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
        center: {lat: 1.36, lng: 103.82},
        zoom: 11,
        mapTypeId: 'mystyle'
      });

      map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'My Style' }));
      window.marker = new google.maps.Marker({position: {lat: 1.3062, lng: 103.7732}, map: map, icon: iconConfig});
      window.marker.setLabel('121')
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
      window.location.href = "/#/busstop"

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
