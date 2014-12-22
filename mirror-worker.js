var gearmanode = require('gearmanode');
var worker = gearmanode.worker();
var spawn = require('child_process').spawn;
var spawnHelper = require('./spawn_helper');

//Sample JSON
//TODO: REMOVE ME
var sample = {
    "snapshotID": 1,
    "address":  "http://www.google.com"
};

worker.addFunction('generateMirror', function (job) {
    var payLoad = JSON.parse(job.payload.toString());
    var snapshotID = payLoad.snapshotID;
    var address = payLoad.address;

    var options = [
        './commands/mirror.js',
        address,
        '/tmp/'
    ];

    var node = spawn('node', options);

    spawnHelper.captureSpawnOutput(node, function(output, error, code){
        if(code === 0) {
            job.workComplete(output);
        } else {
            job.reportError(error);
        }
    });

});