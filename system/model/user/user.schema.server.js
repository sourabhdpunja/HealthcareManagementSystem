/**
 * Created by prasadtajane on 8/5/17.
 */
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({

    practices:[
        {location_slug:String,
        visit_address:{
            city:String,
            street:String,
            street2:String,
            zip:String,
            state:String},
        phones:[{number:String}]
    }],

    educations:[{
        degree:String,
        graduation_year:String,
        school:String}],

    google: {
        id:    String,
        token: String
    },
    facebook: {
        id:    String,
        token: String
    },

    profile:{
        first_name:String,
        last_name:String,
        title:String,
        gender:String,
        image_url:{type:String, default:"uploads/heart-pulse.jpeg"},
        bio:String,
        languages:[{
            name:String,
            code:String}]
    },

    ratings:[{
        provider:String,
        provider_url:String,

        rating:String, /*this is extra*/

        comments:String,
        image_url:{type:String, default:"uploads/heart-pulse.jpeg"}
    }],

    specialties:[{
        name:String,
        category:String,
        description:String}],

    licenses:[{
        number:String,
        state:String}],

    uid:String,
    npi:String,

    username:String,
    password:String,
    email:String,

    physic:{
        height:String,
        weight:String,
        age:String,
        blood:String,
        birthday:{
            type:Date,
            default:Date.now()}
    },

    diseases:String,
    operations:String,
    userType:String,
    isAdmin:{
        type:Boolean,
        default:false},

    insuranceUid:String,
    smokeStatus:{
        type:Boolean,
        default:false},

    _insurances:[{type:mongoose.Schema.Types.ObjectId, ref:"InsuranceModel"}],
    _appointments:[{type:mongoose.Schema.Types.ObjectId, ref:"appointmentModel"}]


}, {     collection:"user"    });

module.exports = userSchema;