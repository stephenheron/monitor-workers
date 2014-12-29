var request = require('request');

module.exports = {
    endpoint: 'http://127.0.0.1/internal-api',
    patchSnapshot: function(snapshotId, data, successCallback, errorCallback) {
        var endpoint = this.endpoint + '/snapshots/' + snapshotId + '.json';
    	this.makeRequest(endpoint, 'patch', data, successCallback, errorCallback);
    },
    patchCssFile: function(resourceId, data, successCallback, errorCallback) {
        this.patchResource(resourceId, 'css', data, successCallback, errorCallback);
    },
    patchJsFile: function(resourceId, data, successCallback, errorCallback) {
        this.patchResource(resourceId, 'js', data, successCallback, errorCallback);
    },
    patchResource: function(resourceId, type, data, successCallback, errorCallback) {
       if(type == 'css'){
           var endpoint = this.endpoint + '/cssfiles/' + resourceId + '.json';
       } else if(type == 'js') {
           var endpoint = this.endpoint + '/javascriptfiles/' + resourceId + '.json';
       }

       if(endpoint) {
           this.makeRequest(endpoint, 'patch', data, successCallback, errorCallback);
       } else {
           errorCallback("Could not match type to endpoint");
       } 
    },
    postImage: function(snapshotId, data, successCallback, errorCallback) {
        var endpoint = this.endpoint + '/snapshots/' + snapshotId + '/images.json';
    	this.makeRequest(endpoint, 'post', data, successCallback, errorCallback);
    },
    makeRequest: function(endpoint, requestType, formData, successCallback, errorCallback) {
	var requestObject;

        if(requestType == 'post') {
            requestObject = request.post(endpoint); 
        } else if(requestType == 'patch') {
            requestObject = request.patch(endpoint); 
        } else {
            requestObject = request.get(endpoint); 
        }

        if(formData) {
            requestObject = requestObject.form(formData);
        }

        requestObject.on('response', function(response){
            var success = false;
            if(response.statusCode === 200) {
                success = true;
            }
            successCallback(success, response);  
        });

        requestObject.on('error', errorCallback);
    }

};
