var path = require('path');
var spawn = require('child_process').spawn;

var guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

if (process.argv.length < 4) {
    console.error('Usage: mirror.js <some URL> <output dir>');
    process.exit(1);
} else {
    var address = process.argv[2];
    var outputDir = process.argv[3];
}

var wgetOptions  = [
    '--adjust-extension',
    '--span-hosts',
    '--convert-links',
    '--backup-converted',
    '--page-requisites',
    '-e robots=off'
];

var directoryName = guid();
directoryName += "-" + Date.now();
outputDir = path.join(outputDir, directoryName);
var directoryPrefixOption = '--directory-prefix=' + outputDir;

wgetOptions.push(directoryPrefixOption);
wgetOptions.push(address);

wget = spawn('wget', wgetOptions);

wget.stdout.on('data', function (data) {
});

wget.stderr.on('data', function (data) {
});

wget.on('close', function(code) {
    if(code === 0) {
        console.log(directoryName);
    } else {
        console.error("wget error");
        process.exit(code);
    }
});


