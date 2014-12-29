var gearmanode = require('gearmanode');
var worker = gearmanode.worker();
var spawn = require('child_process').spawn;
var spawnHelper = require('../spawn_helper');
var apiHelper = require('../api_helper');

worker.addFunction('generateCssStats', function (job) {
    var payLoad = JSON.parse(job.payload.toString());
    var cssFileID = payLoad.cssFileID;
    var address = payLoad.address;

    var options = [
        '../commands/css-stats.js',
        address
    ];

    var node = spawn('node', options);

    spawnHelper.captureSpawnOutput(node, function(output, error, code){
        if(code === 0) {
            apiHelper.patchCssFile(cssFileID, {stats: output},
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
