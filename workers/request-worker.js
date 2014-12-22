var gearmanode = require('gearmanode');
var worker = gearmanode.worker();
var spawn = require('child_process').spawn;
var spawnHelper = require('../spawn_helper');


//Sample JSON
//TODO: REMOVE ME
var sample = {
    "resourceID": 1,
    "address":  "http://www.google.com",
    "type":  'css' //css, js, html
};

worker.addFunction('requestResource', function (job) {
    var payLoad = JSON.parse(job.payload.toString());
    var resourceID = payLoad.snapshotID;
    var address = payLoad.address;
    var type = payLoad.type;

    var options = [
        '../commands/request.js',
        address,
        type
    ];

    var node = spawn('node', options);

    spawnHelper.captureSpawnOutput(node, function(output, error, code){

        if(code == 0){
            //USE API TO UPDATE RESOURCE DEPENDING ON TYPE
            var apiCallFailed = false;

            if(type == 'html') {

            } else if(type == 'css') {

            } else if (type == 'js') {

            } else {
                apiCallFailed = true;
                job.reportError('Could not make the API call as the type was matched');
            }

            if(apiCallFailed == false) {
                job.workComplete(output);
            }
        } else {
            job.reportError('Code: ' + code + '\n' + error);
        }
    });

});
