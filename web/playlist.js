let port = ':8080';
let protocol = 'http://';

let tv = [];

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

let getTV = function () {

    request('/tv', function (data) {

        // console.log(data)

        tv = data.tv;

        videos();
    });
};

getTV();

let videos = function () {

    // console.log(tv)

    for (let i = 0; i < tv.length; i++) {

        let url = protocol + tv[i] + port + '/videos';
        // let url = 'http://localhost:8080/requests/status.xml?command=in_play&input=' + playlistName;
        console.log(url);

        request(url, function (data) {

            console.log(data);

            let div = document.createElement('div');
            div.innerHTML += '<section><b>TV 2 </b>' + tv[i] + '</section>';

            for (let j = 0; j < data.videos.length; j++) {

                div.innerHTML += '<div onclick="changePlaylist(' + i + ', ' + data.videos[j] + ')">' + data.videos[j] + '</div>';
            }

            document.getElementById('controls').appendChild(div);
            // console.log('done')
        });
    }
};

let scan = function () {

    request('/scan', function (data) {
        // data.tv
    });

    location.reload();
};