const port = 80;

let tv = [];

let folder = '/playlist1';

const requestJson = require('request');

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

let player = {};

player = spawn('sh', ['player.sh', folder], {detached: true});

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

    for (let i = 0; i < 255; i++) {

        requestJson('http://192.168.0.' + i + ':8080/videos', { timeout: 1500 }, (err, res, body) => {

            if (err) {} else {

                // console.log(i);
                // console.log(body);

                let ip = '192.168.0.' + i;

                if (tv.indexOf(ip) < 0)
                    tv.push(ip);
            }
        });
    }
});

app.get('/tv', function (request, response) {

    response.json({tv: tv});
});