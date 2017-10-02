/**
 * Created by Sourabh Punja on 8/13/2017.
 */

var mongoose = require("mongoose");

var insuranceSchema = new mongoose.Schema({
    uid:String,
    name:String,
    plans:[{uid:String,name:String,category:[{type:String}]}]
}, {
    collection:"insurance"
});

module.exports = insuranceSchema;