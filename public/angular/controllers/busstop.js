app.controller('busstopController', ['$scope', '$location', 'dataService', '$http', function ($scope, $location, dataService, $http) {
  console.log("BusStop");
  	$scope.showSwitch = dataService.selectedStops.length == 2 ? true : false
  	console.log(dataService.selectedStops);
  	$scope.selected = dataService.selectedStops[0]["BusStopCode"]
  	var url = '/nextbus/' + $scope.selected
    $http.get(url).then(
      function successCallback(response) {
        console.log("Server response", response.data)
          $scope.services = response.data;
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
  
}]);
