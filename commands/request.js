var request = require('request');
var mime = require('mime');

if (process.argv.length < 3) {
    console.error('Usage: request.js <some URL>');
    process.exit(1);
} else {
    var address = process.argv[2];

    request(address, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var type = mime.extension(response.headers['content-type']);
            body = processBody(body, type);
            console.log(body);
        } else {
            if(error){
                console.error(error);
            } else{
                console.error("Response: " + response.statusCode);
            }
            process.exit(1);
        }
    });
}

function processBody(content, type) {
    switch(type) {
        case "html":
            content = processHTML(content);
            break;
        case "js":
            content = processJS(content);
            break;
        case 'css':
            content = processCSS(content);
            break;
    }
    return content;
}

function processCSS(content) {
    var beautify = require('js-beautify').css;
    return beautify(content);
}

function processJS(content) {
    var beautify = require('js-beautify');
    return beautify(content);
}

function processHTML(content) {
    var beautify = require('js-beautify').html;
    return beautify(content);
}
