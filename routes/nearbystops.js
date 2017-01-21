var express = require('express');
var router = express.Router();
var request = require('request');

/* GET bus. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  // Set the headers
  var headers = {
      'AccountKey':       '5bdVaC1QQFeNTvj8xjGOuA==',
      'Content-Type':     'application/json'
  }
  
  // Configure the request
  var options = {
      url: 'http://datamall2.mytransport.sg/ltaodataservice/BusRoutes',
      method: 'GET',
      headers: headers
  }
  
  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // Print out the response body
          console.log(body)
          res.json(JSON.parse(body));
      } else {
      	  res.json({message: "ERROR connecting to LTA"});
      }
  })
});

module.exports = router;





