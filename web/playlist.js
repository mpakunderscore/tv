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

let request = function (url, f) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            f(JSON.parse(xhttp.responseText))
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
};

let changePlaylist = function (i, folder) {

    let url = protocol + tv[i] + port + '/playlist?folder=/' + folder;
    // let url = 'http://localhost:8080/requests/status.xml?command=in_play&input=' + playlistName;

    request(url, null);
};

let lists = function () {

    for (let i = 0; i < tv.length; i++) {

        let url = protocol + tv[i] + port + '/list';
        // let url = 'http://localhost:8080/requests/status.xml?command=in_play&input=' + playlistName;
        console.log(url);

        request(url, function (data) {

            console.log(data);

            let div = document.createElement('div');
            div.innerHTML += '<b>TV 2 </b>' + tv[i];

            for (let j = 0; j < data.videos.length; j++) {

                div.innerHTML += '<div onclick="changePlaylist(' + i + ', ' + data.videos[j] + ')">' + data.videos[j] + '</div>';
            }

            document.getElementById('controls').appendChild(div);
            console.log('done')
        });
    }
};

lists();

let scan = function () {

};