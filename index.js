const port = 8080;
let folder = '/playlist2';

let express = require('express');
let app = express();

//STATIC WEB
app.use('/', express.static(__dirname + '/web'));

let server = require('http').Server(app);
server.listen(port);

let spawn = require('child_process').spawn;


let player = spawn('sh', ['player.sh', folder],{});

app.get('/playlist1', function (request, response) {

    console.log('/playlist1')

    player.kill('SIGINT');
    player = spawn('sh', ['player.sh', '/playlist1'],{});

    response.json({status: '/playlist1'});
});

app.get('/playlist2', function (request, response) {

    console.log('/playlist2')

    player.kill('SIGINT');
    player = spawn('sh', ['player.sh', '/playlist2'],{});

    response.json({status: '/playlist2'});
});