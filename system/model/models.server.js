/**
 * Created by prasadtajane on 8/4/17.
 */


var q = require('q');
var mongoose = require("mongoose");

var connectionString = 'mongodb://127.0.0.1:27017/healthcare'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds145312.mlab.com:45312/heroku_hk8k7m0j'; // user yours
}
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// above with your own URL given to you by mLab

var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;

module.exports = db;

