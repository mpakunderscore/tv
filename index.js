const port = 8080;

let express = require('express');
let app = express();

//STATIC WEB
app.use('/', express.static(__dirname + '/web'));

let server = require('http').Server(app);
server.listen(port);

let spawn = require('child_process').spawn;

let folder = '/playlist1';

let player = spawn('sh', ['player.sh', folder],{});

player.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});