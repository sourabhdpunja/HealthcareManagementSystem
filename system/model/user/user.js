/**
 * Created by prasadtajane on 8/4/17.
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

var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;

module.exports = db;


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

    profile:{
        first_name:String,
        last_name:String,
        title:String,
        gender:String,
        image_url:String,
        bio:String,
        languages:[{
            name:String,
            code:String}]
    },

    ratings:[{
        provider:String,
        provider_url:String,
        rating:String}],

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



}, {
    collection:"user"
});


var User = mongoose.model("user", userSchema);

var users = [
    {username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "a@b.com", contact: 123,  isAdmin: true
        ,educations:[],ratings:[]},
    {"username": "jannunzi", "password": "jannunzi", "firstName": "Jose",   "lastName": "Annunzi",    "email": "a@b.com","ratings":[]},
    {"practices":[{"location_slug":"ca-santa-clara","within_search_area":true,"distance":41.69074568320229,"lat":37.335451,"lon":-121.998482,"uid":"a3b62933b3e831a4a941b074da7135d1","name":"Kaiser Permanente Santa Clara Homestead","website":"http://mydoctor.kaiserpermanente.org/ncal/provider/farhadparivar","accepts_new_patients":true,"insurance_uids":["bluecrosscalifornia-bluecrosscapowerselecthmo","multiplan-multiplanppo","multiplan-phcsppo","multiplan-phcsppokaiser","blueshieldofcalifornia-blueshieldcabasicepobronzelevelhix","blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix","anthem-blueviewvision","healthnet-healthnetindividualfamilyppohix","medicare-medicare","medicaid-medicaid","aetna-aetnamdbronzesilverandgoldhmo","healthnet-bluegoldhmo","healthnet-hmoexcelcaresilvernetwork","healthnet-hmoexcelcaresilvernetworkmedicarecob","gwhcigna-greatwestppo","kaiserpermanente-kaiserpermanente"],"visit_address":{"city":"Santa Clara","lat":37.335451,"lon":-121.998482,"state":"CA","state_long":"California","street":"700 Lawrence Expy","zip":"95051"},"office_hours":[],"phones":[{"number":"1408851100","type":"landline"}],"languages":[{"name":"English","code":"en"}],"media":[{"uid":"56ea4ed308a94f3f4100008c","status":"active","url":"https://asset3.betterdoctor.com/images/56ea4ed308a94f3f4100008c-4_small.jpg","tags":["hero"],"versions":{"small":"https://asset3.betterdoctor.com/images/56ea4ed308a94f3f4100008c-4_small.jpg","medium":"https://asset3.betterdoctor.com/images/56ea4ed308a94f3f4100008c-4_medium.jpg","large":"https://asset3.betterdoctor.com/images/56ea4ed308a94f3f4100008c-4_large.jpg","hero":"https://asset3.betterdoctor.com/images/56ea4ed308a94f3f4100008c-4_hero.jpg"}}]}],
        "educations" : [
            {
                "degree" : "MD",
                "graduation_year" : "1993",
                "school" : "MIT"
            }
        ],"profile":{"first_name":"Jason","middle_name":"R.","last_name":"Snitzer","slug":"jason-snitzer","title":"MD","image_url":"https://asset3.betterdoctor.com/assets/general_doctor_male.png","gender":"male","languages":[{"name":"English","code":"en"}],"bio":"Dr. Jason Snitzer, MD, specialist in pediatrics, currently sees patients in Santa clara, California.\n\nDr. Snitzer is licensed to treat patients in California.\n\nDr. Snitzer has passed an automated background check which looked at elements including medical license status and malpractice screening (no history found)."},
        "ratings":[],"insurances":[{"insurance_plan":{"uid":"bluecrosscalifornia-bluecrosscapowerselecthmo","name":"Blue Cross CA PowerSelect HMO","category":["medical"]},"insurance_provider":{"uid":"anthem","name":"Anthem"}},{"insurance_plan":{"uid":"multiplan-multiplanppo","name":"Multiplan PPO","category":["medical"]},"insurance_provider":{"uid":"multiplan","name":"Multiplan"}},{"insurance_plan":{"uid":"multiplan-phcsppo","name":"PHCS PPO","category":["medical"]},"insurance_provider":{"uid":"multiplan","name":"Multiplan"}},{"insurance_plan":{"uid":"multiplan-phcsppokaiser","name":"PHCS PPO - Kaiser","category":["medical"]},"insurance_provider":{"uid":"multiplan","name":"Multiplan"}},{"insurance_plan":{"uid":"blueshieldofcalifornia-blueshieldcabasicepobronzelevelhix","name":"Basic EPO - Bronze level HIX","category":["medical"]},"insurance_provider":{"uid":"blueshieldofcalifornia","name":"Blue Shield of California"}},{"insurance_plan":{"uid":"blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix","name":"Basic PPO - Bronze level HIX","category":["medical"]},"insurance_provider":{"uid":"blueshieldofcalifornia","name":"Blue Shield of California"}},{"insurance_plan":{"uid":"anthem-blueviewvision","name":"Blue View Vision","category":["vision"]},"insurance_provider":{"uid":"anthem","name":"Anthem Blue Cross"}},{"insurance_plan":{"uid":"healthnet-healthnetindividualfamilyppohix","name":"Health Net Individual  Family - PPO  HIX","category":["medical"]},"insurance_provider":{"uid":"healthnet","name":"HealthNet"}},{"insurance_plan":{"uid":"medicare-medicare","name":"Medicare","category":["medical"]},"insurance_provider":{"uid":"medicare","name":"Medicare"}},{"insurance_plan":{"uid":"medicaid-medicaid","name":"Medicaid","category":["medical"]},"insurance_provider":{"uid":"medicaid","name":"Medicaid"}},{"insurance_plan":{"uid":"aetna-aetnamdbronzesilverandgoldhmo","name":"MD Bronze Silver  Gold - HMO","category":["medical"]},"insurance_provider":{"uid":"aetna","name":"Aetna"}},{"insurance_plan":{"uid":"healthnet-bluegoldhmo","name":"Blue  Gold - HMO","category":["medical"]},"insurance_provider":{"uid":"healthnet","name":"HealthNet"}},{"insurance_plan":{"uid":"healthnet-hmoexcelcaresilvernetwork","name":"HMO - ExcelCare  Silver Network","category":["medical"]},"insurance_provider":{"uid":"healthnet","name":"HealthNet"}},{"insurance_plan":{"uid":"healthnet-hmoexcelcaresilvernetworkmedicarecob","name":"HMO - ExcelCare  Silver Network Medicare COB","category":["medical"]},"insurance_provider":{"uid":"healthnet","name":"HealthNet"}},{"insurance_plan":{"uid":"gwhcigna-greatwestppo","name":"Great West PPO","category":["medical"]},"insurance_provider":{"uid":"gwhcigna","name":"GWH-Cigna"}},{"insurance_plan":{"uid":"kaiserpermanente-kaiserpermanente","name":"Kaiser Permanente","category":["medical"]},"insurance_provider":{"uid":"kaiserpermanente","name":"Kaiser Permanente"}}],"specialties":[{"uid":"pediatrician","name":"Pediatrics","description":"Specializes in the health of children from birth to young adulthood.","category":"medical","actor":"Pediatrician","actors":"Pediatricians"}],"licenses":[{"state":"CA"},{"number":"G76269","state":"CA"}],"uid":"001f60172493d3546f7869f4b8bad742","npi":"1871670711"
    }];


function createUserCollection(users)  {

    function createUsers(arrayName) {
        User.insertMany(arrayName);
        console.log("Users Created!");
    }
    createUsers(users);
}


createUserCollection(users);
function findUser() {
    User.find({"username" : "jannunzi"})
        .then(function (result) {
            console.log('Hi');
            var u = result;
            console.log(u);
            //var l = result[0].languages[0].code;
            console.log("hello");
            console.log(l);
    });}

findUser();