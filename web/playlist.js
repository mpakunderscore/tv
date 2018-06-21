let port = ':8080';
let protocol = 'http://';

let tv = [];

tv.push('localhost');
tv.push('192.168.0.145');
tv.push('192.168.0.164');
tv.push('192.168.0.180');
tv.push('192.168.0.191');

// console.log(tv)

// function jsonp(url, callback) {
//
//     let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
//
//     window[callbackName] = function (data) {
//         console.log(data)
//         // console.log(JSON.parse(data))
//         delete window[callbackName];
//         document.body.removeChild(script);
//         callback(data);
//     };
//
//     let script = document.createElement('script');
//     script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
//     document.body.appendChild(script);
// }

let request = function (url) {

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhr.timeout = 5000;
    xhttp.send();

    return JSON.parse(xhttp.responseText);
}

let changePlaylist = function (i, folder) {

    let url = protocol + tv[i] + port + '/playlist?folder=/' + folder;
    // let url = 'http://localhost:8080/requests/status.xml?command=in_play&input=' + playlistName;

    request(url);
};

let lists = function () {

    for (let i = 0; i < tv.length; i++) {

        let url = protocol + tv[i] + port + '/list';
        // let url = 'http://localhost:8080/requests/status.xml?command=in_play&input=' + playlistName;
        console.log(url);

        let data = request(url);
        console.log(data);

        let div = document.createElement('div');
        div.innerHTML += '<b>TV 2 </b>' + tv[i];

        for (let j = 0; j < data.videos.length; j++) {

            div.innerHTML += '<div onclick="changePlaylist(' + i + ', ' + data.videos[j] + ')">' + data.videos[j] + '</div>';
        }

        document.getElementById('controls').appendChild(div);
        console.log('done')
    }
};

lists();

let scan = function () {

};