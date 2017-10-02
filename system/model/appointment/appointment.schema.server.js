/**
 * Created by prasadtajane on 8/5/17.
 */
var mongoose = require("mongoose");

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

}, {     collection:"appointment"    });

module.exports = appointmentSchema;