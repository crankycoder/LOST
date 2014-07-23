var zmq = require('zmq');
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);

app.use("/static", express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index', { 
    route_id: req.query.route_id
  });
});

var publisher = zmq.socket('pub');
publisher.bind("tcp://*:5563");

app.get('/set', function(req, res){
  publisher.send('location_update', zmq.ZMQ_SNDMORE)
  publisher.send(req.query.lat + ", " + req.query.lng);
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

