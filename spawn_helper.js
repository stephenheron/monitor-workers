module.exports = {
    captureSpawnOutput: function(command, successCallback) {
        var output = '';
        command.stdout.on('data', function(data) {
            output += data;
        });

        var error = '';
        command.stderr.on('data', function(data) {
            error += data;
        });

        command.on('close', function(code) {
            successCallback(output, error, code);
        });
    }
};