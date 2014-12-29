var gearmanode = require('gearmanode');
var worker = gearmanode.worker();
var spawn = require('child_process').spawn;
var spawnHelper = require('../spawn_helper');
var apiHelper = require('../api_helper');

worker.addFunction('requestResource', function (job) {
    var payLoad = JSON.parse(job.payload.toString());
    var resourceID = payLoad.resourceID;
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
            if(type == 'html' || type == 'css' || type == 'js') {
                updateResource(type, output, job, resourceID);
            } else {
                console.error("Resource type not defined");
                job.reportError();
            }

        } else {
            console.error("Command reported wrong exit code");
            console.log("OUTPUT: " + output);
            console.error("ERROR: " + error);
            job.reportError();
        }

        function updateResource(type, output, job, resourceID) {
            var updateFunction;
            var data;
            if(type == 'html') {
                updateFunction = apiHelper.patchSnapshot;
                data = {htmlSource: output} 
            } else if(type == 'css') {
                updateFunction = apiHelper.patchCssFile;
                data = {content: output} 
            } else if(type == 'js') {
                updateFunction = apiHelper.patchJsFile;
                data = {content: output} 
            }

            if(updateFunction) {
                updateFunction.call(apiHelper, resourceID, data,
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
           }
        }
    });

});
