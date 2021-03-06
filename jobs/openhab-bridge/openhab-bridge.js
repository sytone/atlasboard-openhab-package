/**
 * Job: openhab-bridge
 *
 * Expected configuration:
 *
 * 
    "openhab-officelamp" : {
      "openhabSimpleAuth": "simplekeycheck",
      "itemType": "Switch",
      "itemName": "Light_FF_Office_Lamp", 
      "itemLabel": "Study Lamp", 
      "displayImageBase": "lamp",
      "displayLabel": true,
      "interval": 60000
    },
    
    openhabSimpleAuth
      This is a simple key that is used to check the messages come from openhab, nothing more. 
    
    itemType
      This is the same type as in the items file.   
      
    itemName
      This is the name of the item in openhab so the job know what to do with it along with the widget. 
    
    displayImageBase
      Used if the image changes on state. The value '-<state>.png' is added to the image, assumed all images in widget/assets.
      
    displayLabel
      If true we put the label on the widget.  
      
    interval
      How often we check internal state of the job. 
      
 */
var moment = require('moment');

module.exports = {

  /**
   * Executed on job initialisation (only once)
   * @param config
   * @param dependencies
   */
  onInit: function (config, dependencies) {

    var logger = dependencies.logger;
    
    
    if (!config.openhabSimpleAuth) {
      throw 'Please configure the expected auth token for the request.';
    }
    
    if (!config.itemType) {
      throw 'Please configure type of item in openhab.';
    }

    if (!config.itemName) {
      throw 'Please configure name of item in openhab.';
    }
    
    for (var i = dependencies.app._router.stack.length - 1; i >= 0; i--) {
        logger.info(dependencies.app._router.stack[i].regexp.toString());
        if (dependencies.app._router.stack[i].regexp.toString().indexOf(config.itemName) > -1
            && dependencies.app._router.stack[i].regexp.toString().indexOf("internal") > -1) {
            dependencies.app._router.stack.splice(i, 1);
        }
    }
    
    
    var lastCallback = moment();
    dependencies.app.route('/jobs/openhabbridge/' + config.itemName + '/internal')
      .post(function (req, res) {
          
        var secondsDiff = moment().diff(lastCallback, 'seconds')
        logger.info('seconds since last call ' + secondsDiff);
        if(secondsDiff > 2) {
            
            lastCallback = moment();
            
            if(req.body.auth != config.openhabSimpleAuth) {
                logger.error('Unauthorised POST detected for ' + req.originalUrl);
                res.end('END');
            }
            
            //logger.info('POST detected for ' + req.originalUrl)
            //jobWorker.pushUpdate({data: { title: config.widgetTitle, html: 'loading...' }}); // on Atlasboard > 1.0
            var uri = config.openHabRestEndpoint + "CMD?" + config.itemName + "=" + req.body.state;
            logger.info(uri);
            dependencies.request({uri:uri, encoding: null}, function (error, response, body) { 
                    if (!error && response.statusCode == 200) { 
                        //logger.info('Command Sent');
                    }});

            res.end('Command sent: ' + uri);
        } else {
            res.end('Too many requests in a short period.');
        }
      });

  },

  /**
   * Executed every interval
   * @param config
   * @param dependencies
   * @param jobCallback
   */
  onRun: function (config, dependencies, jobCallback) {

    var logger = dependencies.logger;
    
    requestPath = config.openHabRestEndpoint + 'rest/items/'+config.itemName+'?type=json';
    
    var options = {
        url: requestPath,
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Accept': 'application/json' }
    };
    
    //logger.debug(requestPath);
    var req = dependencies.request(options, function(err, response, body) {
        if (err || !response || response.statusCode != 200) {
            jobCallback('err on http request' + err);
        } else {
            var jsonObject = JSON.parse(body);
            jobCallback(null, { state: jsonObject.state,
                itemType: config.itemType,
                itemName: config.itemName,
                itemLabel: config.itemLabel,
                itemBody: config.itemBody,
                displayImageBase: config.displayImageBase,
                displayLabel: config.displayLabel,
                openhabSimpleAuth: config.openhabSimpleAuth,
                text: 'Loading...' }, true); 
        }
    });
    
    
          
    return;
    
    /* 
    
    Long term I want a push from a rule in OpenHAB to the job. The Init does not have the ability to 
    do a call back so that is not a option. 
    
    Code for trying to do this. 
    
    for (var i = dependencies.app._router.stack.length - 1; i >= 0; i--) {
        logger.info(dependencies.app._router.stack[i].regexp.toString());
        if (dependencies.app._router.stack[i].regexp.toString().indexOf(config.itemName) > -1
            && dependencies.app._router.stack[i].regexp.toString().indexOf("external") > -1) {
            dependencies.app._router.stack.splice(i, 1);
        }
    }
    
    logger.info('Adding the openhab bridge route for ' + config.itemName);
    dependencies.app.route('/jobs/openhabbridge/' + config.itemName + "/external")
      .post(function (req, res) {
        //logger.info('POST detected from ' + req.originalUrl);
        //logger.info('POST body auth ' + req.body.auth);
        
        if(req.body.auth != config.openhabSimpleAuth) {
          logger.error('Unauthorised POST detected for ' + req.originalUrl);
          res.end('END');
        }
        
        logger.info('POST detected for ' + req.originalUrl);
        //jobWorker.pushUpdate({data: { title: config.widgetTitle, html: 'loading...' }}); // on Atlasboard > 1.0
        jobCallback(null, { state: req.body.state,
          itemType: config.itemType,
          itemName: config.itemName,
          itemLabel: config.itemLabel,
          itemBody: config.itemBody,
          displayImageBase: config.displayImageBase,
          displayLabel: config.displayLabel,
          openhabSimpleAuth: config.openhabSimpleAuth,
          text: 'loading...' }, true); 
        res.end('So something useful here');
      });

      */
      
    /*

     2. CONFIGURATION CHECK

     You probably want to check that the right configuration has been passed to the job.
     It is a good idea to cover this with unit tests as well (see test/openhab-bridge file)

     Checking for the right configuration could be something like this:

     if (!config.myrequiredConfig) {
     return jobCallback('missing configuration properties!');
     }


     3. SENDING DATA BACK TO THE WIDGET

     You can send data back to the widget anytime (ex: if you are hooked into a real-time data stream and
     don't want to depend on the jobCallback triggered by the scheduler to push data to widgets)

     jobWorker.pushUpdate({data: { title: config.widgetTitle, html: 'loading...' }}); // on Atlasboard > 1.0


     4. USE OF JOB_CALLBACK

     Using nodejs callback standard conventions, you should return an error or null (if success)
     as the first parameter, and the widget's data as the second parameter.

     This is an example of how to make an HTTP call to google using the easyRequest dependency,
     and send the result to the registered widgets.
     Have a look at test/openhab-bridge for an example of how to unit tests this easily by mocking easyRequest calls

     */

    //dependencies.easyRequest.HTML('http://google.com', function (err, html) {
      // logger.trace(html);
      //jobCallback(err, { title: config.widgetTitle, html: html });
    //});
  }
};