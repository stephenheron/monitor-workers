var gearmanode = require('gearmanode');
var worker = gearmanode.worker();
var spawn = require('child_process').spawn;
var spawnHelper = require('../spawn_helper');


//Sample JSON
//TODO: REMOVE ME
var sample = {
    "snapshotID": 1,
    "address":  "http://www.google.com",
    "width":  1920,
    "height": 1080
};

worker.addFunction('generateScreenshot', function (job) {
    var payLoad = JSON.parse(job.payload.toString());
    var snapshotID = payLoad.snapshotID;
    var address = payLoad.address;
    var height = payLoad.height;
    var width = payLoad.width;

    var options = [
        '../commands/screenshot.casper.js',
        address,
        width,
        height
    ];

    var casperjs = spawn('casperjs', options);

    spawnHelper.captureSpawnOutput(casperjs, function(output, error, code){
        if(code === 0){
            //USE API TO UPDATE SNAPSHOT
            job.workComplete(output);
        } else {
            job.reportError('Code: ' + code + '\n' + error);
        }
    });

});
