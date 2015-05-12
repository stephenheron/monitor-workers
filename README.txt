As I am using Vagrant for development I ran into some problems which led me to installing the node modules globally.
You need to export the following environment variable to get node to read the global module directory:

export NODE_PATH=/usr/local/lib/node_modules/monitor-workers/node_modules

I am using casperJS and it requires a PHATOMJS environment variable as well:

export PHANTOMJS_EXECUTABLE=/usr/local/lib/node_modules/casperjs/node_modules/phantomjs/bin/phantomjs
