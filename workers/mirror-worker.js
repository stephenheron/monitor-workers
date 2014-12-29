var gearmanode = require('gearmanode');
var worker = gearmanode.worker();
var spawn = require('child_process').spawn;
var spawnHelper = require('../spawn_helper');
var apiHelper = require('../api_helper');

worker.addFunction('generateMirror', function (job) {
    var payLoad = JSON.parse(job.payload.toString());
    var snapshotID = payLoad.snapshotID;
    var address = payLoad.address;
    var outputDir = payLoad.outputDir;

    var options = [
        '../commands/mirror.js',
        address,
        outputDir
    ];

    var node = spawn('node', options);

    spawnHelper.captureSpawnOutput(node, function(output, error, code){
        if(code === 0) {
            apiHelper.patchSnapshot(snapshotID, {mirrorDirectoryName: output},
                function(callSuccessful, response) {
                    if(callSuccessful) {
                        console.log('API Call Successful');
                        job.workComplete(output)
                    } else {
                        console.log('API Call Failed:');
                        console.log(response);
                        job.reportError();
                    }
                },
                function(error) {
                    console.log('API Call Failed:');
                    console.log(error);
                    job.reportError();
               }
            );
        } else {
            console.log('ERROR:' + error);
            console.log('OUTPUT:' + output);
            job.reportError();
        }
    });

});
