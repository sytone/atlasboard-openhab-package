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

module.exports = {

  /**
   * Executed on job initialisation (only once)
   * @param config
   * @param dependencies
   */
  onInit: function (config, dependencies) {


  },

  /**
   * Executed every interval
   * @param config
   * @param dependencies
   * @param jobCallback
   */
  onRun: function (config, dependencies, jobCallback) {

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
    
    
    logger.info('Adding the openhab bridge route for ' + config.itemName);
    dependencies.app.route('/jobs/openhabbridge/' + config.itemName)
      .post(function (req, res) {
        if(req.body.auth != config.openhabSimpleAuth) {
          logger.error('Unauthorised POST detected for ' + req.originalUrl);
          res.end('END');
        }
        
        logger.info('POST detected for ' + req.originalUrl)
        //jobWorker.pushUpdate({data: { title: config.widgetTitle, html: 'loading...' }}); // on Atlasboard > 1.0
        jobCallback(null, { state: req.body.state,
          itemType: config.itemType,
          itemName: config.itemName,
          itemLabel: config.itemLabel,
          itemBody: config.itemBody,
          displayImageBase: config.displayImageBase,
          displayLabel: config.displayLabel,
          text: 'loading...' }, true); 
        res.end('So something useful here');
      });

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