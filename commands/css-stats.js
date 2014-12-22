var styleStats = require('stylestats');

if (process.argv.length < 3) {
    console.error('Usage: request.js <some URL>');
    process.exit(1);
} else {
    var address = process.argv[2];
    var options = {
        "published": true,
        "paths": true,
        "stylesheets": true,
        "styleElements": true,
        "size": true,
        "dataUriSize": true,
        "ratioOfDataUriSize": true,
        "gzippedSize": false,
        "simplicity": true,
        "rules": true,
        "selectors": true,
        "mostIdentifier": true,
        "mostIdentifierSelector": true,
        "lowestCohesion": true,
        "lowestCohesionSelector": true,
        "totalUniqueFontSizes": true,
        "uniqueFontSize": true,
        "totalUniqueFontFamilies": true,
        "uniqueFontFamily": true,
        "totalUniqueColors": true,
        "uniqueColor": true,
        "idSelectors": true,
        "universalSelectors": true,
        "unqualifiedAttributeSelectors": true,
        "javascriptSpecificSelectors": "[#\\.]js\\-",
        "importantKeywords": true,
        "floatProperties": true,
        "mediaQueries": true,
        "propertiesCount": 10,
        "requestOptions": {}
    };

    var stats = new styleStats(address, options);
    stats.parse(function (error, result) {
        if(error) {
            console.error(error);
            process.exit(1);
        }
        console.log(JSON.stringify(result, null, 2));
    });
}
