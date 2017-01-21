app.config( function($routeProvider) {
  $routeProvider.when("/", {
      templateUrl : "templates/home.html",
      controller: "homeController"
  })

  $routeProvider.when("/other", {
      templateUrl : "templates/other.html",
      controller: "otherController"
  })

  // $routeProvider.when("/directory", {
  //     templateUrl : "templates/directory.html",
  //     controller: "directoryController"
  // })
});

app.config(function($provide) {
    $provide.decorator('ngViewDirective', function($delegate) {
        var directive = $delegate[0];
        directive.replace = true;

        return $delegate;
    });
});
