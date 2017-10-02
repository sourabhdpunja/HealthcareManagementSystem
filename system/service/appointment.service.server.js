/**
 * Created by prasadtajane on 7/27/17.
 */

var app = require("../../express");
var appointmentModel = require("../model/appointment/appointment.model.server");

var pages = [];

app.get("/api/user/:userId/appointment",getAppointments);
app.get("/api/user/:userId/appointment/:appointmentId",findappointmentById);

app.post("/api/user/:userId/appointment", createappointment);
app.put("/api/user/:userId/appointment/:appointmentId", updateappointment);
app.delete("/api/user/:userId/appointment/:appointmentId", deleteAppointment);


function getAppointments(request, response) {

    var userId = request.params.userId;

    var patientName = request.query.patientName;
    //console.log(patientName);
    var date = request.query.date;
    var category = request.query.category;
    var priority = request.query.priority;

    if(patientName)    {
        findappointmentByPatient(request, response);
    } else if (date)   {
        findappointmentByDate(request, response);
    }else if (category)   {
        findappointmentByCategory(request, response);
    }else if (priority)   {
        findappointmentByPriority(request, response);
    }
    else    {
        console.log("inside appointment server final else");
        findAppointmentByUserId(request, response);
    }
}


function findappointmentByPatient(request, response) {
    return appointmentModel
        .findappointmentByPatient(request.query.patientName)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}

function findappointmentByDate(request, response) {
    return appointmentModel
        .findappointmentByPatient(request.query.date)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}

function findappointmentByCategory(request, response) {
    return appointmentModel
        .findappointmentByPatient(request.query.category)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}

function findappointmentByPriority(request, response) {
    return appointmentModel
        .findappointmentByPatient(request.query.priority)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}

function findAppointmentByUserId(request, response) {
    var userId = request.params.userId;
    console.log("inside appointment server - findAppointmentByUserId");
    console.log(userId);
    return appointmentModel
        .findAppointmentByUserId(userId)
        .then(function (appointment) {
            console.log("inside appointment server then - findAppointmentByUserId");
            console.log(appointment);
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function findappointmentById(request, response) {
    var appointmentId = request.params.appointmentId;
    return appointmentModel
        .findappointmentById(appointmentId)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}


function createappointment(request, response) {
    console.log("Inside appointment server - createappointment");
    var userId = request.params.userId;
    var newAppointment = request.body;
    console.log(userId);
    console.log(newAppointment);

    return appointmentModel
        .createappointment(newAppointment)
        .then(function (appointment) {
            //console.log(page);
            console.log("Inside appointment server then - createappointment");
            //console.log(appointment);
            return response.json(appointment);
        }, function (err) {
            console.log("Inside Error");
            //console.log(err);
        });
}

/*function updateappointment(request, response) {
    var appointmentId = request.params.appointmentId;
    var newAppointment = request.body;

    return appointmentModel
        .updateappointment(appointmentId, newAppointment)
        .then(function (appointment) {
            response.json(appointment);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}*/

function updateappointment(request, response) {
    var appointmentId = request.params.appointmentId;
    var nAppointment = request.body;

     var newAppointment = {
         doctor_name:nAppointment.doctor_name,
         doctorId:nAppointment.doctorId,
         patient_name:nAppointment.patient_name,
         patientId:nAppointment.patientId,
         specialty:nAppointment.specialty,
         appointment_category:nAppointment.appointment_category,
         priority:nAppointment.priority,
         details:nAppointment.details,
         date:nAppointment.date,
         time:nAppointment.time,
         isApproved:nAppointment.isApproved,
         _reports:nAppointment._reports
     }

    console.log("Inside appointment server then - updateappointment");
    return appointmentModel
        .deleteappointment(appointmentId)
        .then(function (appointment) {
            console.log("Inside appointment server then - updateappointment,deleteappointment");
            return appointmentModel
                .createappointment(newAppointment)
                .then(function (appointment) {
                    console.log("Inside appointment server then - updateappointment,deleteappointment,createappointment");
                    console.log("Created new appointment");
                    console.log(appointment);
                    return response.json(appointment);
                }, function (err) {
                    console.log("Inside Error");
                    //console.log(err);
                })
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deleteAppointment(request, response) {
    var appointmentId = request.params.appointmentId;

    return appointmentModel
        .deleteappointment(appointmentId)
        .then(function (appointment) {
            response.send("200");
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}