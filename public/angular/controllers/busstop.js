app.controller('busstopController', ['$scope', '$location', 'dataService', '$http', '$routeParams', function ($scope, $location, dataService, $http, $routeParams) {
    console.log("BusStop");
    $scope.busStopObject = dataService.getBusStop($routeParams.busstop);
    console.log($scope.busStopObject);
    if ( $scope.busStopObject == null ) {
      $scope.error = true;
    } else {
      $scope.error = false;
      $scope.showSwitch = $scope.busStopObject.Stops.length == 2;

      if ( $scope.showSwitch ) {
        $scope.switch = $scope.busStopObject.Stops[1].BusStopCode == $routeParams.busstop;
      }

      $scope.favServices = [];
      $scope.otherServices = [];

    	$scope.selected = $scope.busStopObject.Stops[0]["BusStopCode"]
    	var url = '/nextbus/' + $scope.selected
      $http.get(url).then(
        function successCallback(response) {
          console.log("Server response", response.data)
            $scope.services = response.data;
            for ( var i = 0 ; i < $scope.services.length; i++ ) {
              if ( i / $scope.services.length < 0.3 ) {
                $scope.favServices.push($scope.services[i]);
              } else {
                $scope.otherServices.push($scope.services[i]);
              }
            }
          },
          function errorCallback(response) {
            console.log("Server error", response.data);
          }
        );
      $scope.selectService = function(service) {
      	locat = "/#/service/" + $scope.selected + "/" + service;
      	console.log(locat)
      	window.location.href = locat;
      }

      $scope.switchStop = function() {
        console.log($scope.switch);
        window.location.href = "/#/busstop/" + $scope.busStopObject.Stops[$scope.switch?0:1].BusStopCode
      }
    }


}]);
