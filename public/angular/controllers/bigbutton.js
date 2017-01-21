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

  $scope.lastClicked = new Date('2010-01-21T15:40:33+00:00');
  $scope.isBusHere = function() {
    $scope.clicks += 1;

    var now = new Date();
    var timeSinceLastClicked = now - $scope.lastClicked;

    function showToast() {
      var mins = (new Date($scope.estArrival) - new Date()) / 1000 / 60;
      console.log(mins);
      if ( mins < 0.5 ) {
        $scope.response = "YES";
      } else {
        $scope.response = "NO";
      }
      $mdToast.show(
        $mdToast.simple()
          .textContent($scope.response)
          .position( $scope.getToastPosition() )
          .hideDelay(1000)
      );
    }

    if ( timeSinceLastClicked > 15000 ) {
      $scope.lastClicked = now;
      $http({
        method: 'GET',
        url: '/nextbus/' + $scope.busstop + '/' + $scope.service
      }).then(function successCallback(response) {
        $scope.estArrival = response.data.NextBus.EstimatedArrival;
        console.log($scope.estArrival);

        showToast();
      });
    } else {
      showToast();
    }
    console.log(timeSinceLastClicked);

  }

  $scope.clicks = 0;

  setInterval(function() {
    $scope.clicks -= 1;
    if ($scope.clicks < 0) {
      $scope.clicks = 0;
    }

    if ($scope.clicks > 13) {
      $scope.clicks = 13;
    }
    $scope.setUncleImage();
  }, 1000);

  $scope.setUncleImage = function() {
    if ( $scope.clicks > 6 ) {
      console.log("Clicks", $scope.clicks);
      if ( $scope.clicks % 2 == 0) {
        console.log("0");
        $scope.uncleSrc = 'assets/uncle-pressured.png';
        $scope.$apply();
      } else {
        console.log("1");
        $scope.uncleSrc = 'assets/uncle-pressured2.png';
        $scope.$apply();
      }
    } else if ( $scope.clicks > 1 ) {
      $scope.uncleSrc = 'assets/uncle-trying.png';
      $scope.$apply();
    } else {
      // Happy uncle
      $scope.uncleSrc = 'assets/uncle-happy.png';
      $scope.$apply();
    }
  }
  $scope.uncleSrc = 'assets/uncle-happy.png';

}]);
