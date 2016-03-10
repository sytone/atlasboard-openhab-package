/**
 * Test file for Job: adtscanner
 */

var assert = require ('assert');
var adtscannerSUT = require('../adtscanner');

var mockedConfig, mockedDependencies;

describe ('adtscanner test', function(){

  beforeEach(function (done) {
    
    mockedConfig = {
      username: "myusername",
      password: "secretpassword",
      interval: 20000
    };

    mockedDependencies = {
      logger: console,
      easyRequest : {
        JSON : function (options, cb) {
          cb(null, {});
        },
        HTML : function (options, cb){
        cb(null, 'hello from google');
        }
      }
    };

    done();
  });
  

  describe ('config checks', function(){
    it('should check for valid credentials', function (done){
      adtscannerSUT.onRun(mockedConfig, mockedDependencies, function(err, data){
        assert.ifError(err);
        done();
      });        
    });
  });

  describe ('http request example tests', function(){
    it('should handle server errors', function (done){

      mockedDependencies.easyRequest.HTML = function (options, cb){
        cb(null, 'hello from google');
      };

      adtscannerSUT.onRun(mockedConfig, mockedDependencies, function(err, data){
        assert.equal('hello from google', data.html, 'expected a different reply from google: ' + data.html);
        done();
      });
    });
  });

});
