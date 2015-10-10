/**
 * Job: webcam-image
 *
 * Expected configuration:
 *
 * { 
 *   myconfigKey : [ 
 *     { 
 *       imageUrl : 'http://1.1.1.1/image.png',
 *       username : 'readaccount',
 *       password : 'readonlypassword'
 *     } 
 *   ]
 * }
 */

var request = require('request');

module.exports = {
    onRun: function (config, dependencies, jobCallback) {

        if (config.username) {
            request.get(config.imageUrl, {
                'auth': {
                    'user': 'username',
                    'pass': 'password',
                    'sendImmediately': false
                }
            }, imageCallback);
        } else {
            request(config.imageUrl, imageCallback);
        }


        function imageCallback(error, response, body) {
            if (error) {
                return console.error('image request failed:', error);
                jobCallback(errMsg);
            }
            jobCallback(null, { response: response, body: body });
        }


    }

};
