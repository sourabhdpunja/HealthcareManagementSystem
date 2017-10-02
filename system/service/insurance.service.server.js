/**
 * Created by Sourabh Punja on 8/14/2017.
 */


var app = require("../../express");
var insuranceModel = require("../model/insurance/insurance.model.server");
var userModel = require("../model/user/user.model.server");

// var pages=[
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
// ];

app.get("/api/insurance",findAllInsurance);
//app.get("/api/insurance?name=",findAllInsurancesByName);
app.get("/api/user/:userId/insurance",findAllInsurancesByUserId);
app.post("/api/user/:userId/insurance",createInsurance);
app.get("/api/user/:userId/insurance/:insuranceId",findInsuranceById);
app.put("/api/user/:userId/insurance/:insuranceId",updateInsurance);
app.delete("/api/user/:userId/insurance/:insuranceId/plan/:planId",deleteInsurance);
app.get("/api/user/:userId/insurance/:insuranceId/add",addInsuranceInUser);
app.delete("/api/user/:userId/insurance/:insuranceId/patient",removeInsuranceFromUser);

function removeInsuranceFromUser(req,res){
    var userId= req.params.userId;
    var insuranceId= req.params.insuranceId;
    userModel
        .removeInsuranceFromUser(insuranceId,userId)
        .then(function (user){
            res.sendStatus(200);
        });
}

function addInsuranceInUser(req,res){
    var userId= req.params.userId;
    var insuranceId= req.params.insuranceId;
    userModel
        .addInsuranceInUser(insuranceId,userId)
        .then(function (user){
           res.sendStatus(200);
        });
}

function findAllInsurance(req,res){
    if (req.query.name) {
        insuranceModel
            .findAllInsurancesByName(req.query.name)
            .then(function (insurances){
                res.json(insurances);
            });
    }
    else    {
        insuranceModel
            .findAllInsurance()
            .then(function (insurances){
                res.json(insurances);
            });
    }
}

function findAllInsurancesByUserId(req,res){
    var userId= req.params.userId;
    userModel
        .findAllInsurancesByUserId(userId)
        .then(function (user){
            insurances = user._insurances;
            res.json(insurances);
        });
}

function deleteInsurance(req,res){
    var userId= req.params.userId;
    var insuranceId= req.params.insuranceId;
    var planId= req.params.planId;
    insuranceModel
        .deleteInsurance(insuranceId,userId,planId)
        .then(function (user){
            res.json(user);
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

function updateInsurance(req,res){
    var userId= req.params.userId;
    var insuranceId= req.params.insuranceId;
    var insurance = req.body;
    //console.log(insurance);
    //console.log(insuranceId);
    console.log("insurance server");
    console.log(insurance);
    console.log(insurance.plans);
    insuranceModel
        .updateInsurance(insuranceId,insurance)
        .then(function(status){
            //console.log(status);
            return insuranceModel
                .findInsuranceById(insuranceId);
        },function (err) {
            res.sendStatus(404).send(err);
        })
        .then(function(insurance){
            res.json(insurance);
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

function findInsuranceById(req,res){
    var userId= req.params.userId;
    var insuranceId= req.params.insuranceId;
    insuranceModel
        .findInsuranceById(insuranceId)
        .then(function(insurance){
            res.json(insurance);
        });
    // for (var p in pages){
    //     if (pages[p]._id === pageId){
    //         res.json(pages[p]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function createInsurance(req,res){
    var userId= req.params.userId;
    // var insuranceId= req.params.insuranceId;
    var insurance = req.body;
    insuranceModel
        .createInsurance(userId,insurance)
        .then(function(insurance){
            res.json(insurance);
        });
    // page.websiteId = websiteId;
    // page._id = (new Date()).getTime() + "";
    // pages.push(page);
    // res.json(page);
}
