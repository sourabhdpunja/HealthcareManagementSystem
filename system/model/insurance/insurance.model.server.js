/**
 * Created by Sourabh Punja on 8/13/2017.
 */


var mongoose = require("mongoose");
var insuranceSchema = require('./insurance.schema.server');
var db = require('../models.server');

var insuranceModel = mongoose.model('InsuranceModel',insuranceSchema);
var userModel = require('../user/user.model.server');

insuranceModel.createInsurance = createInsurance;
insuranceModel.updateInsurance = updateInsurance;
insuranceModel.deleteInsurance = deleteInsurance;
insuranceModel.findAllInsurance = findAllInsurance;
insuranceModel.findInsuranceById = findInsuranceById;
insuranceModel.findAllInsurancesByName = findAllInsurancesByName;

module.exports = insuranceModel;

function createInsurance(userId,insurance){
    // report.appointmentId = appointmentId;
    // var reportTmp = null;
    return insuranceModel
        .create(insurance)
        .then(function (insurance){
        insuranceTmp = insurance;
        return userModel
            .addInsuranceInUser(insurance._id,userId);
    })
    .then(function (user){
        return insuranceTmp;
    });
}

function findInsuranceById(insuranceId){
    return insuranceModel.findById(insuranceId);
}

function updateInsurance(insuranceId,insurance){
    console.log("model update insurance");
    console.log(insuranceId);
    console.log(insurance);
    return insuranceModel.update({_id : insuranceId},{$set : insurance});
}

function deleteInsurance(insuranceId,userId,planId){

    return insuranceModel
        .findById(insuranceId)
        .then(function(insurance){
           var index = insurance.plans.indexOf(planId);
           insurance.plans.splice(index,1);
           return insurance.save()
               .then(function (insurance){
                   userModel
                          .removeInsuranceFromUser(insuranceId,userId)
                            .then(function (user){
                               return insurance;
                            });
               });
        });
    // return insuranceModel.remove({_id: insuranceId})
    // .then(function (status){
    //     return userModel
    //         .removeInsuranceFromUser(insuranceId,userId);
    // });
}

function findAllInsurance(){
    return insuranceModel.find();
}

function findAllInsurancesByName(name){
    return insuranceModel.find({name:name});
}