/**
 * Job: clock
 *
 * Expected configuration:
 *
 * ## PLEASE ADD AN EXAMPLE CONFIGURATION FOR YOUR JOB HERE
 * { 
 *   myconfigKey : [ 
 *     { serverUrl : 'localhost' } 
 *   ]
 * }
 */

module.exports = {

    /**
     * Executed on job initialisation (only once)
     * @param config
     * @param dependencies
     */
    onInit: function (config, dependencies) {

        /*
        This is a good place for initialisation logic, like registering routes in express:
    
        dependencies.logger.info('adding routes...');
        dependencies.app.route("/jobs/mycustomroute")
            .get(function (req, res) {
              res.end('So something useful here');
            });
        */

        dependencies.logger.info('adding routes...');
        dependencies.app.route("/jobs/clock")
            .get(function (req, res) {
                var date = new Date();
                res.end(date.valueOf().toString());
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

        // Set defualts. 
        var timeZoneOffset = 0; // Default to UTC.
        var dateFormat = "yyyy-mm-dd";
        var timeFormat = "h:MM"

        if (config.timeZone) {
            timeZoneOffset = config.timeZone;
        }
        if (config.dateFormat) {
            dateFormat = config.dateFormat;
        }
        if (config.timeFormat) {
            timeFormat = config.timeFormat;
        }

        var currentDate = new Date();
        var currentUtcDate = currentDate.getUTCDate();
        var shiftedDate = currentUtcDate;

        jobCallback(null, {
            hideTitle: config.hideTitle,
            title: config.title,
            date: currentDate,
            dateFormat: dateFormat,
            timeFormat: timeFormat
        });
    }
};