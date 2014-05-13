var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var WebSocket = require('faye-websocket');

var count = 0;
var clients = {};

var port = process.env.PORT || 8000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  // send the message to all clients
  for(var i in clients) {
      clients[i].send(req.body.message);
  }
  res.send(200);
});

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    
    var ws = new WebSocket(request, socket, body);
    // Specific id for this client & increment count
    var id = count++;
    // store the socket so we can contact it when a message comes in
    clients[id] = ws

    // new client connects to the server
    ws.on('open', function(event) {
      console.log('Received a new client connection & sending a welcome message');
      ws.send('{"message": "Welcome to Corona! We are always watching."}');
    });    

    // received a message from the client
    ws.on('message', function(event) {
      console.log('The client responded: ' + event.data);
    });

    // client disconnects from the server
    ws.on('close', function(event) {
      console.log('close', event.code, event.reason);
      delete clients[id];
      ws = null;
    });
  }
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
