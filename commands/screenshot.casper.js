var casper = require('casper').create({
    //verbose: true,
    //logLevel: 'debug',
    onError: function(self, m) { // Any "error" level message will be written
        console.error('FATAL:' + m); // on the console output and PhantomJS will
        self.exit(); // terminate
        process.exit(1);
    }
});

if (casper.cli.args.length < 3) {
    console.error('Usage: screenshot.casper.js <some URL> <width> <height>');
    exit(1);
} else {
    var address = casper.cli.args[0];
    var viewport = {
        width: casper.cli.args[1],
        height: casper.cli.args[2]
    };
}


casper.start(address, function(){
    casper.viewport(viewport.width, viewport.height, function(){
        console.log(this.captureBase64('png'));
    });
});

casper.run();
