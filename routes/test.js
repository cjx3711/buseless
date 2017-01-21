
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log("Test endpoint");
  // res.render('index', { title: 'Express' });
  console.log(req.params);
  // var busstopid = busstop;
  // var serviceno = busno;
  var busstopid = '';

  // Set the headers
  var headers = {
    'AccountKey':       '5bdVaC1QQFeNTvj8xjGOuA==',
    'Content-Type':     'application/json'
  }

  var base = 'http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=';
  var skip = 0;
  var busStopData = [];

  getData();
  function getData() {
    var url = base + skip;
    console.log("Getting data at: " + url);
    request({
      url: url,
      method: 'GET',
      headers: headers
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // Print out the response body
          var data = JSON.parse(body);
          console.log(data.value.length);

          for ( var i = 0; i < data.value.length; i++ ) {
            busStopData.add(data.value[i]);
          }
          dataComplete();
          // if ( data.value.length > 0 ) {
          //   skip += 50;
          //   getData();
          // } else {
          //   dataComplete();
          // }
      } else {
          res.json({message: "ERROR connecting to LTA"});
      }
    });
  }

  function dataComplete() {
    res.json({data: busStopData});
  }
});

module.exports = router;
