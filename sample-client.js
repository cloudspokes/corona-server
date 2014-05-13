var WebSocket = require('faye-websocket');
var ws  = new WebSocket.Client('ws://localhost:8000');
var http = require('http');

var port = process.env.PORT || 8001;

var server = http.createServer()
  .listen(port);

// receive a message from the server
ws.on('message', function(event) {
  console.log('-->', JSON.parse(event.data));
  // send a receipt back to the server
  //ws.send('Got the message on port ' + port + '. Thanks!!');
});

console.log("Corona client is listening on port " + port);