/**
 * Created by prasadtajane on 8/4/17.
 */

var db = require("../models.server");
var mongoose = require('mongoose');
var userModel = require("../user/user.model.server");

var appointmentSchema = require("./appointment.schema.server");
var appointmentModel = mongoose.model("appointmentModel", appointmentSchema);

appointmentModel.findAll = findAll;
appointmentModel.createappointment = createappointment;
appointmentModel.updateappointment = updateappointment;
appointmentModel.deleteappointment = deleteappointment;
appointmentModel.findappointmentById = findappointmentById;
appointmentModel.findappointmentByDate = findappointmentByDate;
appointmentModel.addReportToAppointment = addReportToAppointment;
appointmentModel.findAppointmentByUserId = findAppointmentByUserId;
appointmentModel.findappointmentByPatient = findappointmentByPatient;
appointmentModel.findappointmentByPriority = findappointmentByPriority;
appointmentModel.findappointmentByCategory = findappointmentByCategory;
appointmentModel.findReportsByAppointmentId = findReportsByAppointmentId;
appointmentModel.removeReportFromAppointment = removeReportFromAppointment;

module.exports = appointmentModel;

appointment = appointmentModel;


//.log(appointment);



function findAppointmentByUserId(userId) {
    return userModel
        .findAllAppointmentsByUserId(userId)
        .then(function (user) {
            return user._appointments;
        })
}

function createappointment(appointmentIn) {
    //console.log("inside server appointment - createappointment");
    var userList = []
    userList.push(appointmentIn.doctorId);
    userList.push(appointmentIn.patientId);
    // console.log("manish");
    // console.log(appointmentIn);
    return appointment
        .create(appointmentIn)
        .then(function (appointmentOut) {
            //console.log("inside server appointment then - createappointment");
            return userModel
                .addAppointmentInUsers(appointmentOut._id, userList)
                .then(function (id) {
                    //console.log("inside server appointment then - createappointment, userModel");
                    return appointmentOut;
                }, function (err) {
                    console.log("inside model appointment then - err");
                    console.log(err);
                    return err;
                });
            return appointmentOut;
        });
}

function findappointmentById(appointmentId) {
    //console.log("inside findByappointmentId of model! = "+appointmentId);
    return appointmentModel
        .findById(appointmentId);
}

function findappointmentByDate(dateIn) {
    //console.log("inside findByappointmentId of model! = "+appointmentId);
    return appointmentModel
        .find({date:dateIn});
}

function findappointmentByPatient(name) {
    //console.log("inside findByappointmentId of model! = "+appointmentId);
    return appointmentModel
        .find({patient_name:name});
}

function findappointmentByPriority(pri) {
    //console.log("inside findByappointmentId of model! = "+appointmentId);
    return appointmentModel
        .find({priority:pri});
}

function findappointmentByCategory(category) {
    //console.log("inside findByappointmentId of model! = "+appointmentId);
    return appointmentModel
        .find({appointment_category:category});
}

function findAll() {
    return appointment
        .find({});
}

function addReportToAppointment(appointmentId, reportId) {
    return findappointmentById(appointmentId)
        .then(function (appointment) {
            appointment._reports.push(reportId);
            return appointment.save();
        })
}


function removeReportFromAppointment(appointmentId, reportId) {
    return findappointmentById(appointmentId)
        .then(function (appointment) {
            appointment._reports.splice(appointment._reports.indexOf(reportId),1);
            return appointment.save();
        })
}

function updateappointment(appointmentId, appointment)   {
    return appointmentModel.update({_id:appointmentId}, {$set: appointment});
}


function deleteappointment(appointmentId) {
    //console.log("inside appointment model - deleteappointment");
    //console.log(appointmentId);
    return appointmentModel
        .findOne({_id:appointmentId})
        .then(function (appointment) {
            //console.log("inside user model then - deleteappointment");
            //console.log(appointment);
            var userList = [];
            userList.push(appointment.doctorId);
            userList.push(appointment.patientId);
            //console.log(userList);

            appointment.remove({_id:appointmentId})
                .then(function (status) {
                    userModel
                        .removeAppointmentFromUsers(appointmentId, userList);
                    //console.log(status);
                    return;
                })
        });
}

function findReportsByAppointmentId(appointmentId) {
    return appointmentModel
        .findOne({_id:appointmentId})
        .then(function (appointment) {
            var reports = appointment._reports;
            if (reports.length !== 0)   {
                return appointmentModel
                    .findOne({_id:appointmentId})
                    .populate('_reports')
                    .exec()
                    .then(function (appointmentOut) {
                        return appointmentOut._reports;
                    })
            }
            else return appointment._reports;
        });
}

//findAll();
//findappointmentById("59857d3d4d8f54554ad60a17", callback);
//       findappointmentById("59857d3d4d8f54554ad60a19", callback);
//findappointmentByappointmentname("alice");
//findappointmentByCreadentials("alice", "alice");
//var appointment = { firstName:"alicia", lastName:"wonderWomania" }
//updateappointment("598515103cf9234d20944366", appointment);
//deleteappointment("598515103cf9234d20944366")
/*
function tryM() {
    var a = findappointmentById("59852da4cd24bf4f03ed2690");
    updateappointment("59852da4cd24bf4f03ed2691",a)
    findAll();
}

tryM();*/

//
/*findappointmentByappointmentname("alice", function (err, result) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(result);
        return result;
    }
});*/
//
// findappointmentById("59857d3d4d8f54554ad60a19", function (err, result) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(result);
//         return result;
//     }
// });

/*var appointment = { appointmentname: 'a', password: 'a'};
console.log
("call create appointment");
createappointment(appointment
    , function (err, result) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(result);
            return result;
        }}
    );*/
