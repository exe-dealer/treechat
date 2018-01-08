const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4001 });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});


const index_html = fs.readFileSync('./index.html');
http.createServer(function (req, res) {
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.end(index_html); 
//   res.end(); //end the response
}).listen(4000);