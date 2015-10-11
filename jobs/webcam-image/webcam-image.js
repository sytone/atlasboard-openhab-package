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



module.exports = {
    onRun: function (config, dependencies, jobCallback) {


        if (config.username) {
            dependencies.request.get(config.imageUrl, {
                'auth': {
                    'user': 'username',
                    'pass': 'password',
                    'sendImmediately': false
                }
            }, imageCallback);
        } else {
            dependencies.request(config.imageUrl, imageCallback);
        }


        function imageCallback(error, response, body) {
            if (error) {
                return console.error('image request failed:', error);
                jobCallback('Unable to access image.');
            }
            jobCallback(null, { response: response, body: body });
        }


    }

};
