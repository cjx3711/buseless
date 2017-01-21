app.service('dataService', [ '$http', function($http) {
  this.welcomeMessage = "The quick brown fox jumps over the lazy dog.";
  // this.sendRawTextInput = function(data) {
  //   console.log("Sending data", data);

    // $http.post('/command', {data: data}).then(
    //   function successCallback(response) {
    //     console.log("Server response", response.data);
    //   },
    //   function errorCallback(response) {
    //     console.log("Server error", response);
    //   }
    // );
  // }
  // this.selectedStops = [];

  this.getBusStop = function(id) {
    var ret = null; // I know this is not efficient.
    this.busStopArr.forEach( function(busStop) {
      busStop.Stops.forEach( function(stop) {
        if ( stop.BusStopCode == id ) {
          ret = busStop;
        }
      });
    });
    return ret;
  }
  this.busStopArr = [
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
      ], 
      "ServiceArr": []
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
      ], 
      "ServiceArr": []
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
      ], 
      "ServiceArr": []
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
      ], 
      "ServiceArr": []
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
      ], 
      "ServiceArr": []
    }
  ];

  var service = this;
  for (var i = 0; i < service.busStopArr.length; i++) {

      var num = service.busStopArr[i]["Stops"][0]["BusStopCode"];
      var url = '/nextbus/' + num;
      $http.get(url).then(
        (function(index) {
            return function(response) {
                console.log("Server response", response.data)
                var data = response.data;
                console.log(data)
                var singleServiceArr = [];
                for (var j = 0; j < data.length; j++) {
                  singleServiceArr.push(data[j]["ServiceNo"]);
                }
                console.log(service.busStopArr, index);
                service.busStopArr[index]["ServiceArr"] = singleServiceArr;
            }
        })(i),
        function errorCallback(response) {
          console.log("Server error", response.data);
        }
        );

    }



}]);
