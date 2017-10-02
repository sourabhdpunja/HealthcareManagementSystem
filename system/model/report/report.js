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

var reportSchema = new mongoose.Schema({
    doctorName:String,
    patientName:String,
    prescription: String,
    dosage: String,
    doctorcomments: String,
    futureappointments: String,
    imageurl: String,
    appointmentId:{type:mongoose.Schema.Types.ObjectId, ref:"AppointmentModel"},
},{
    collection:"report"
});


var reportModel = mongoose.model("ReportModel", reportSchema);


var reportData = [
    {"doctorName":"John","patientName":"Newpatient","prescription":"No Prescription","dosage":"No dosage","doctorcomments":"Doctor Comments"
    ,"futureappointments":"futureappointments","imageurl":"image Url"}
];

function callback(err, result)   {
    //console.log(err);
    //console.log(result);
}

function createReport(reportData)  {

    reportModel.create(reportData, callback)

    console.log("Report Created!");
}
// languageModel.create({name:"english", code: "en"})

function findReport() {
    reportModel.find()
        .then(function (result) {
            console.log(result);

            // var l = result.languages.;
            // console.log(l);
        });}
// createReport(reportData);

// findReport();