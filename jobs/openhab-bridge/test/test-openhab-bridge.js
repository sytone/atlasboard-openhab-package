/**
 * Test file for Job: openhab-bridge
 */

var assert = require ('assert');
var openhabbridgeSUT = require('../openhab-bridge');

var mockedConfig, mockedDependencies;

describe ('openhab-bridge test', function(){

  beforeEach(function (done) {
    
    mockedConfig = {
      globalAuth: {
        myconfigKey: {
          username: "myusername",
          password: "secretpassword"
        }
      },
      interval: 20000
    };

    mockedDependencies = {
      logger: console,
      easyRequest : {
        JSON : function (options, cb) {
          cb(null, {});
        }
      }
    };

    done();
  });



  describe ('config checks', function(){
    it('should check for valid credentials', function (done){
      // there are some nice examples of how to unit tests configuration handling
      // in the Atlassian package:
      // https://bitbucket.org/atlassian/atlasboard-atlassian-package/src/master/jobs
      done();
    });
  });

  describe ('http request example tests', function(){
    it('should handle server errors', function (done){

      mockedDependencies.easyRequest.HTML = function (options, cb){
        cb(null, 'hello from google');
      };

      var config = {};
      openhabbridgeSUT.onRun(config, mockedDependencies, function(err, data){
        assert.equal('hello from google', data.html, 'expected a different reply from google: ' + data.html);
        done();
      });
    });
  });

});
