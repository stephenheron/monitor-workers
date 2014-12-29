var gearmanode = require('gearmanode');
var worker = gearmanode.worker();
var spawn = require('child_process').spawn;
var spawnHelper = require('../spawn_helper');
var apiHelper = require('../api_helper');

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
            apiHelper.postImage(snapshotID, {imageData: output, width: width, height: height},
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
            job.reportError();
        }
    });

});
