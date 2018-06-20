let port = ':8080';
let protocol = 'http://';

let tv = [];

tv[0] = '';
tv[1] = '192.168.0.145';
// tv[2] = '192.168.0.164';
// tv[3] = '192.168.0.164';
// tv[4] = '192.168.0.164';

function jsonp(url, callback) {

    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

let changePlaylist = function (i, playlistId) {

    let url = protocol + tv[i] + port + '/playlist?folder=/playlist' + playlistId;
    // let url = 'http://localhost:8080/requests/status.xml?command=in_play&input=' + playlistName;

    jsonp(url, function () {});
};