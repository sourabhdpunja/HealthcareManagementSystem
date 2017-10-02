/**
 * Created by Sourabh Punja on 8/14/2017.
 */


var app = require("../../express");
var reportModel = require("../model/report/report.model.server");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/system/uploads' });

// var pages=[
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
// ];

app.get("/api/user/:userId/appointment/:appointmentId/report",findReport);
app.post("/api/user/:userId/appointment/:appointmentId/report",createReport);
app.get("/api/user/:userId/appointment/:appointmentId/report/:reportId",findReportById);
app.put("/api/user/:userId/appointment/:appointmentId/report/:reportId",updateReport);
app.delete("/api/user/:userId/appointment/:appointmentId/report/:reportId",deleteReport);
app.get("/api/user/:userId/allreports",findAllReport);
app.post("/api/upload/report",upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var myFile        = req.file;

    var userId        = req.body.userId;
    var appointmentId = req.body.appointmentId;
    var reportId      = req.body.reportId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    var photourl     = '/system/uploads/'+filename;


    return reportModel
        .findReportById(reportId)
        .then(function (report) {
            report.imageurl=photourl;
            report.imagename = filename;
            reportModel
                .updateReport(reportId, report)
                .then(function (status) {
                    var callbackUrl = "/system/#!/appointment/"+appointmentId+"/report/"+reportId;
                    res.redirect(callbackUrl);
                }, function (err) {
                    console.log(err);
                    return err;
                });
        });
    // widget.url = '/uploads/'+filename;

    // console.log(widget);
    // user.url = '/system/uploads/'+myFile.filename ;
    // widget.myFile = myFile;
    // widget.name = name;
    // widget.width = width;
    // widget.text = text;
    // console.log("widget service - after setting property");
    // console.log(widget);

    // widgetModel
    //     .updateWidget(widgetId, widget)
    //     .then(function (widget) {
    //         return widget;
    //     }, function (err) {
    //         console.log(err);
    //         return err;
    //     });
    // var callbackUrl   = "/system/#/user/"+userId+"/website/"+websiteId;
    // var callbackUrl = "/system/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
    // var callbackUrl = "/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    // res.redirect(callbackUrl);
}

function findAllReport(req,res){
    var userId= req.params.userId;
    reportModel
        .findAllReport()
        .then(function (reports){
            res.json(reports);
        });
}

function deleteReport(req,res){
    var userId= req.params.userId;
    var appointmentId = req.params.appointmentId;
    var reportId = req.params.reportId;
    reportModel
        .deleteReport(appointmentId,reportId)
        .then(function (status){
            res.json(status);
        });

    // for (var p in pages) {
    //         if (pages[p]._id === pageId) {
    //         pages.splice(p,1);
    //         res.sendStatus(200);
    //         return;
    //         }
    //     }
    // res.sendStatus(404);
}

function updateReport(req,res){
    var userId= req.params.userId;
    var appointmentId = req.params.appointmentId;
    var reportId = req.params.reportId;
    var report = req.body;
    reportModel
        .updateReport(reportId,report)
        .then(function(status){
            return reportModel
                .findReportById(reportId);
        },function (err) {
            res.sendStatus(404).send(err);
        })
        .then(function(report){
            res.json(report);
            return;
        },function(err){
            res.sendStatus(404).send(err);
            return;
        });
    // for (var p in pages){
    //         if (pages[p]._id === pageId){
    //             pages[p]=page;
    //             res.json(pages[p]);
    //             return;
    //         }
    //     }
    //     res.sendStatus(404);
}

function findReportById(req,res){
    var userId= req.params.userId;
    var appointmentId = req.params.appointmentId;
    var reportId = req.params.reportId;
    reportModel
        .findReportById(reportId)
        .then(function(report){
            res.json(report);
        });
    // for (var p in pages){
    //     if (pages[p]._id === pageId){
    //         res.json(pages[p]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function createReport(req,res){
    var userId= req.params.userId;
    var appointmentId = req.params.appointmentId;
    var report = req.body;
    reportModel
        .createReport(appointmentId,report)
        .then(function(report){
            res.json(report);
        });
    // page.websiteId = websiteId;
    // page._id = (new Date()).getTime() + "";
    // pages.push(page);
    // res.json(page);
}

function findReport(request, response) {
    var userId= request.params.userId;
    var appointmentId = request.params.appointmentId;
    var patient = request.query.patient;
    if (appointmentId && patient)   {
        findReportByPatientName(request, response);
    }
    else {
        findReportByApppointmentId(request, response);
    }
}

function findReportByPatientName(request, response) {
    reportModel
        .findReportByPatientName(request.query.patient)
        .then(function (report) {
            // console.log(report);
            response.json(report);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function findReportByApppointmentId(request, response) {
    //console.log(request.params.userId)
    return  reportModel
        .findReportByApppointmentId(request.params.appointmentId)
        .then(function (report) {
            //console.log("inside report service server - then");
            //console.log(report);
            response.json(report);
        });
}