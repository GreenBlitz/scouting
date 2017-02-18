var video = (function () {
    return {
        list: list,
        upload: upload,
        request: request,
        download: download
    };

    function list(cb) {
        var stream = emit('list');

        stream.on('data', function (data) {
            cb(null, data.files);
        });

        stream.on('error', cb);
    }

    function upload(file, cb) {
        var stream = emit('upload', {
            name: file.name,
            size: file.size,
            type: file.type
        }, file);

        stream.on('data', function (data) {
            cb(null, data);
        });

        stream.on('error', cb);
    }

    function request(name) {
        emit('request', {
            name: name
        });
    }

    function download(stream, sourceBuffer, mediaSource, cb, parts) {
        var firstTime = true;
        stream.on('data', function (data) {
            if (firstTime) {
                firstTime = false;
                sourceBuffer.appendBuffer(data);
            } else {
                console.log("Pushing more data");
                parts.push(data);
                // console.log("parts.length:", parts.length);
            }
        });

        stream.on('error', function (err) {
            cb(err);
        });

        stream.on('end', function () {
            // $video.webkitSourceEndOfStream(HTMLMediaElement.EOS_NO_ERROR);
            cb(null, true);
            console.log("Ended stream")
            // var src = (window.URL || window.webkitURL)
            //     .createObjectURL(new Blob(parts));
            //
            // cb(null, src);
        });
    }
})();
