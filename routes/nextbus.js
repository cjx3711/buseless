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
          var result = _.find(services, function(obj) {
            return obj["ServiceNo"] === serviceno;
          });
          
          console.log(result);
          console.log(serviceno);
          if (result) {
            res.json(result);
          } else {
            res.json({message: "Service number not found at bus stop"});
          }
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





