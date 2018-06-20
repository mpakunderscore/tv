const port = 8080;
let folder = '/playlist2';

let express = require('express');
let app = express();

//STATIC WEB
app.use('/', express.static(__dirname + '/web'));

let server = require('http').Server(app);
server.listen(port);

let spawn = require('child_process').spawn;

let player = spawn('sh', ['player.sh', folder], {detached: true});

app.get('/playlist', function (request, response) {

    let folder = request.query.folder;

    console.log(folder)

    process.kill(-player.pid);
    player = spawn('sh', ['player.sh', folder], {detached: true});

    response.json({playlist: folder});
});