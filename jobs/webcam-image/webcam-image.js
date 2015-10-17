
var fs = require('fs');
var bufferList = require('bufferlist').BufferList;



module.exports = {
    onRun: function (config, dependencies, jobCallback) {

        var logger = dependencies.logger;
        var imageFileName = 'packages/' + config.dashboardName + '/widgets/' +  config.widgetName + '/' + config.imageFileName;
        var bl = new BufferList();
        
    //  request({uri:config.imageUrl, responseBodyStream: bl}, function (error, response, body) { 
    //    if (!error && response.statusCode == 200) { 
    //      var data_uri_prefix = "data:" + response.headers["content-type"] + ";base64,"; 
    //      var image = new Buffer(bl.toString(), 'binary').toString('base64');                                                                                                                                                                  
    //      image = data_uri_prefix + image; 
    //    }) 

        
        if (config.username) {
            
            var stream = dependencies.request.get(config.imageUrl)
                .auth(config.username, config.password, false)
                .on('error', function(err) {
                    logger.error('Unable to access image: ' + err);
                    console.log(err)
                })
                .pipe(fs.createWriteStream(imageFileName));
        } else {
            var stream = dependencies.request(config.imageUrl)
                .on('error', function(err) {
                    logger.error('Unable to access image: ' + err);
                    console.log(err)
                })
                .pipe(fs.createWriteStream(imageFileName));
        }

        var imageSrc = "/widgets/resources?resource=" + config.dashboardName + "/" +  config.widgetName + "/" + config.imageFileName;
        
        stream.on('finish', function () { jobCallback(null, { imageSrc: imageSrc, title: config.imageTitle}); });
    }
};
