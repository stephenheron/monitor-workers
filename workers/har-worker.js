var gearmanode = require('gearmanode');
var worker = gearmanode.worker();
var spawn = require('child_process').spawn;
var spawnHelper = require('../spawn_helper');

//Sample JSON
//TODO: REMOVE ME
var sample = {
    "snapshotID": 1,
    "address":  "http://www.google.com"
};

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
            //MAKE API CALL TO UPDATE SNAPSHOT

            //CasperJS sometimes gives a bad output that includes text after the JSON: https://github.com/ariya/phantomjs/issues/12697
            //I am being a bit hacky and trimming everything after the last closing brace
            output = output.substr(0, output.lastIndexOf('}') + 1);
            job.workComplete(output)
        } else {
            job.reportError(error);
        }
    });

});