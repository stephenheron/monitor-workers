var gearmanode = require('gearmanode');
var worker = gearmanode.worker();
var spawn = require('child_process').spawn;
var spawnHelper = require('../spawn_helper');
var apiHelper = require('../api_helper');

worker.addFunction('generateHAR', function (job) {
    var payLoad = JSON.parse(job.payload.toString());
    var snapshotID = payLoad.snapshotID;
    var address = payLoad.address;

    var options = [
        '../commands/har.casper.js',
        address
    ];

    var casperjs = spawn('casperjs', options);

    spawnHelper.captureSpawnOutput(casperjs, function(output, error, code){
        if(code === 0) {
            //CasperJS sometimes gives a bad output that includes text after the JSON: https://github.com/ariya/phantomjs/issues/12697
            //I am being a bit hacky and trimming everything after the last closing brace
            output = output.substr(0, output.lastIndexOf('}') + 1);

            apiHelper.patchSnapshot(snapshotID, {har: output}, 
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
