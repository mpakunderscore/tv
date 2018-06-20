const port = 8080;

let express = require('express');
let app = express();

//STATIC WEB
app.use('/', express.static(__dirname + '/web'));

let server = require('http').Server(app);
server.listen(port);