#!/bin/sh

pm2 start css-stats-worker.js
pm2 start har-worker.js
pm2 start mirror-worker.js
pm2 start request-worker.js
pm2 start screenshot-worker.js

