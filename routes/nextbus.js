var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');

/* GET busstopid and filter by service no */
router.get('/:busstopid/:serviceno', function(req, res, next) {
   
  var busstopid = req.params['busstopid'];
  var serviceno = req.params['serviceno'];
  
  // Set the headers
  var headers = {
      'AccountKey':       '5bdVaC1QQFeNTvj8xjGOuA==',
      'Content-Type':     'application/json'
  }
  
  var url = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrival?BusStopID=' + busstopid;

  // Configure the request
  var options = {
      url: url,
      method: 'GET',
      headers: headers
  }
  
  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          var services = JSON.parse(body)["Services"]
          var len = services.length;
          var result = {};
          var i = 0;
          // while (services[i]["ServiceNo"] == serviceno) {

          // }
          //  (var i = 0; i < len; i++) {
          //   if () {
          //     result = services[i];
          //   }
          // }
          res.json(result);
      } else {
      	  res.json({message: "ERROR connecting to LTA"});
      }
  })
});

// GET bus stop id
router.get('/:busstopid', function(req, res, next) {
   
  var busstopid = req.params['busstopid'];
  
  // Set the headers
  var headers = {
      'AccountKey':       '5bdVaC1QQFeNTvj8xjGOuA==',
      'Content-Type':     'application/json'
  }
  
  var url = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrival?BusStopID=' + busstopid;

  // Configure the request
  var options = {
      url: url,
      method: 'GET',
      headers: headers
  }
  
  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          var services = JSON.parse(body)["Services"]
          res.json(services);
      } else {
          res.json({message: "ERROR connecting to LTA"});
      }
  })
});

module.exports = router;





