app.config( function($routeProvider) {
  $routeProvider.when("/", {
      templateUrl : "templates/home.html",
      controller: "homeController"
  })

  $routeProvider.when("/busstop", {
      templateUrl : "templates/busstop.html",
      controller: "busstopController"
  })

  $routeProvider.when("/service/:busstop/:busno", {
      templateUrl : "templates/bigbutton.html",
      controller: "bigbuttonController"
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
