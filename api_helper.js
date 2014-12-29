var request = require('request');

module.exports = {
    endpoint: 'http://127.0.0.1/internal-api',
    patchSnapshot: function(snapshotId, data, successCallback, errorCallback) {
        var endpoint = this.endpoint + '/snapshots/' + snapshotId + '.json';
        request
            .patch(endpoint)
            .form(data) 
            .on('response', function(response){
                var success = false;
                if(response.statusCode === 200) {
                    success = true;
                }
                successCallback(success, response);  
            })
            .on('error', errorCallback);
    },
    patchResource: function() {

    },
    postImage: function() {

    }

    function makeRequest(endpoint, requestType, data, successCallback, errorCallback) {
    }

};
