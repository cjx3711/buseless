app.controller('bigbuttonController', ['$scope', '$location', 'dataService', '$mdToast', '$routeParams', function ($scope, $location, dataService, $mdToast, $routeParams) {
  console.log("Other");
  var last = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.service = $routeParams.id;

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
    $scope.response = "No";


  var pinTo = $scope.getToastPosition();

  $mdToast.show(
    $mdToast.simple()
      .textContent('NO')
      .position( pinTo )
      .hideDelay(1000)
  );
  }

}]);
