const port = 8080;

let express = require('express');
let app = express();

//Allow cross-origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//STATIC WEB
app.use('/', express.static(__dirname + '/web'));

let server = require('http').Server(app);
server.listen(port);

console.log('http://localhost:' + port);

let spawn = require('child_process').spawn;

// let player = spawn('sh', ['player.sh', folder], {detached: true});

app.get('/playlist', function (request, response) {

    let folder = request.query.folder;
    // console.log(folder)

    process.kill(-player.pid);
    player = spawn('sh', ['player.sh', folder], {detached: true});

    response.json({playlist: folder});
});

app.get('/videos', function (request, response) {

    const { readdirSync, statSync } = require('fs');
    const { join } = require('path');
    const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

    response.json({videos: dirs('videos')});
});

app.get('/scan', function (request, response) {

    for (let i = 0; i < 256; i++) {

        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'http://192.168.0.' + i + '/list', false);
        xhttp.send();
    }
});

app.get('/tv', function (request, response) {

    let tv = [];

    tv.push('localhost');
    tv.push('192.168.0.145');
    tv.push('192.168.0.164');
    tv.push('192.168.0.180');
    tv.push('192.168.0.191');

    response.json({tv: tv});
});