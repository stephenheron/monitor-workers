var gearmanode = require('gearmanode');
var client = gearmanode.client();

var sample = {
    "snapshotID": 1,
    "address":  "http://www.google.com"
};
sample = JSON.stringify(sample);

var job = client.submitJob('generateHAR', sample);

job.on('complete', function() {
    console.log('RESULT >>> ' + job.response);
    client.close();
});