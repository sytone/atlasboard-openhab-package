var fs = require('fs');

module.exports = {
    onRun: function (config, dependencies, jobCallback) {

        var logger = dependencies.logger;
        var imageFileName = 'packages/' + config.dashboardName + '/widgets/' +  config.widgetName + '/' + config.imageFileName;
        var image, stream, useBase64Stream;
        
        if(!config.useBase64Stream) {
            useBase64Stream = true;
        } else {
            useBase64Stream = config.useBase64Stream;
        }
        
        if (config.username) {
            if(useBase64Stream) {
                dependencies.request({uri:config.imageUrl, encoding: null}, function (error, response, body) { 
                if (!error && response.statusCode == 200) { 
                    image = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                    jobCallback(null, { imageSrc: image, title: config.imageTitle, useBase64Stream: useBase64Stream});
                }}).auth(config.username, config.password, false);
            } else {
                stream = dependencies.request.get(config.imageUrl)
                    .auth(config.username, config.password, false)
                    .on('error', function(err) {
                        logger.error('Unable to access image: ' + err);
                        console.log(err)
                    })
                    .pipe(fs.createWriteStream(imageFileName));
            }
        } else {
            if(useBase64Stream) {
                dependencies.request({uri:config.imageUrl, encoding: null}, function (error, response, body) { 
                if (!error && response.statusCode == 200) { 
                    image = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                    jobCallback(null, { imageSrc: image, title: config.imageTitle, useBase64Stream: useBase64Stream});
                }});
            } else {            
                stream = dependencies.request(config.imageUrl)
                    .on('error', function(err) {
                        logger.error('Unable to access image: ' + err);
                        console.log(err)
                    })
                    .pipe(fs.createWriteStream(imageFileName));
            }
        }

        if(!useBase64Stream) {
            var imageSrc = "/widgets/resources?resource=" + config.dashboardName + "/" +  config.widgetName + "/" + config.imageFileName;
            stream.on('finish', function () { jobCallback(null, { imageSrc: imageSrc, title: config.imageTitle, useBase64Stream: useBase64Stream}); });
        }
    }
};
