/**
 * Created by prasadtajane on 8/4/17.
 */


var q = require('q');
var mongoose = require("mongoose");

var connectionString = 'mongodb://127.0.0.1:27017/healthcare'; // for local
if(process.env.MLAB_appointmentNAME_WEBDEV) { // check if running remotely
    var appointmentname = process.env.MLAB_appointmentNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds145312.mlab.com:45312/heroku_hk8k7m0j'; // appointment yours
}

var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;

module.exports = db;


var appointmentSchema = new mongoose.Schema({


    doctor_name:String,
    doctorId:String,
    patient_name:String,
    patientId:String,
    specialty:String,
    appointment_category:String,
    priority:String,
    details:String,
    date:Date,
    time:String,
    isApproved:{type:Boolean, default:false},
    _reports:[{type:mongoose.Schema.Types.ObjectId, ref:"ReportModel"}]


}, {
    collection:"appointment"
});


var appointmentModel = mongoose.model("AppointmentModel", appointmentSchema);

var appointments = [
    {
        doctor_name:"Steve Wagh",
        patient_name:"Jose Annuziato",
        specialty:"Orthopedist",
        appointment_category:"Follow Up",
        priority:"Very High",
        details:"Severe pain in left ankle",
        date:Date.now(),
        time:"12:00 PM",
    },
    {
        doctor_name:"Charles Roy",
        patient_name:"Michel Wand",
        specialty:"Pediatrition",
        appointment_category:"First Appointment",
        priority:"High",
        details:"Rashes on skin",
        date:Date.now(),
        time:"1:00 PM",
    }
];


function createappointmentCollection(appointments)  {

    function createappointments(arrayName) {
        appointmentModel.insertMany(arrayName);
        console.log("appointments Created!");
    }
    createappointments(appointments);
}


createappointmentCollection(appointments);
function findappointment() {
    appointmentModel.find({})
        .then(function (result) {
            console.log('Hi');
            var u = result;
            console.log(u);
    });}

findappointment();