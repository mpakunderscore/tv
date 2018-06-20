let port = ':8080';
let protocol = 'http://';

let tv = [];

tv[0] = '';
tv[1] = '192.168.0.145';
// tv[2] = '192.168.0.164';
// tv[3] = '192.168.0.164';
// tv[4] = '192.168.0.164';

let changePlaylist = function (i, playlist) {

    let playlistName = 'tv/videos/playlist' + playlist;

    let url = protocol + tv[i] + port + '/requests/status.xml?command=in_play&input=' + playlistName;

    const Http = new XMLHttpRequest();

    Http.open("GET", url);

    Http.send();

    Http.onreadystatechange = (e) => {

        // console.log(Http.responseText)
    }
};