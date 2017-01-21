app.controller('bigbuttonController', ['$scope', '$location', 'dataService', '$mdToast', '$routeParams', '$http', function ($scope, $location, dataService, $mdToast, $routeParams, $http) {
  console.log("Other");
  var last = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.busstop = $routeParams.busstop;
  $scope.service = $routeParams.busno;

  $scope.getToastPosition = function() {
      sanitizePosition();

      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };

    function sanitizePosition() {
      var current = $scope.toastPosition;

      if ( current.bottom && last.top ) current.top = false;
      if ( current.top && last.bottom ) current.bottom = false;
      if ( current.right && last.left ) current.left = false;
      if ( current.left && last.right ) current.right = false;

      last = angular.extend({}, current);
    }

    $scope.toastPosition = angular.extend({},last);

  $scope.isBusHere = function() {

    $http({
      method: 'GET',
      url: '/nextbus/' + $scope.busstop + '/' + $scope.service
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response);
      var estArrival = response.data.NextBus.EstimatedArrival;
      console.log(estArrival);
      var mins = (new Date(estArrival) - new Date()) / 1000 / 60;
      console.log(mins);
      if ( mins < 0.5 ) {
        $scope.response = "YES";
      } else if ( mins < 2 ) {
        $scope.response = "SOON";
      } else {
        $scope.response = "NO";
      }

      $mdToast.show(
        $mdToast.simple()
          .textContent($scope.response)
          .position( $scope.getToastPosition() )
          .hideDelay(1000)
      );
    });



  }

}]);
