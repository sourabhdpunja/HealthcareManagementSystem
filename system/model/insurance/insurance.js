/**
 * Created by Sourabh Punja on 8/13/2017.
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

var insuranceSchema = new mongoose.Schema({
    uid:String,
    name:String,
    plans:[{uid:String,name:String,category:[{type:String}]}]
}, {
    collection:"insurance"
});


var insurance = mongoose.model("InsuranceModel", insuranceSchema);

var insuranceData = [
    {"uid":"amerihealth","name":"Amerihealth","plans":[{"uid":"amerihealth-amerihealthregionalprefntwkhmohmopos","name":"Amerihealth Regional Pref Ntwk HMO HMO POS","category":["medical"]},{"uid":"amerihealth-amerihealthlocalvaluenetworkepoposppo","name":"Amerihealth Local Value Network EPO POS PPO","category":["medical"]},{"uid":"amerihealth-amerihealthlocalvaluenetworkhmohmopos","name":"Amerihealth Local Value Network HMO HMO POS","category":["medical"]},{"uid":"amerihealth-amerihealthregionalprefntwkepoposppo","name":"Amerihealth Regional Pref Ntwk EPO POS PPO","category":["medical"]}]}
];

function callback(err, result)   {
    //console.log(err);
    //console.log(result);
}

function createInsurance(insuranceData)  {

    for (a in insuranceData)  {
        insurance.create(insuranceData[a], callback)
        }
        console.log("Insurances Created!");
}
    // languageModel.create({name:"english", code: "en"})

function findInsurance() {
    insurance.find()
        .then(function (result) {
            console.log(u);

            // var l = result.languages.;
            // console.log(l);
        });}
// createInsurance(insuranceData);
findInsurance();