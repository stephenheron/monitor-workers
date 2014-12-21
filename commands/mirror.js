var path = require('path');
var crypto = require('crypto');
var spawn = require('child_process').spawn;

if (process.argv.length < 4) {
    console.log('Usage: mirror.js <some URL> <output dir>');
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

var directoryName =  crypto.createHash('md5').update(address).digest("hex");
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
        console.log(outputDir);
    } else {
        console.error("wget error");
        process.exit(code);
    }
});


