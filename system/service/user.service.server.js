/**
 * Created by prasadtajane on 7/27/17.
 */

var app = require("../../express");

var cookie = require('cookie-parser');
var session = require('express-session');
var passport         = require('passport');

var userModel = require("../model/user/user.model.server");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/system/uploads' });
//var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var users = [];


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,//"127136052951-0fjksqo0mt624fevn7l000r8t03k540k.apps.googleusercontent.com",
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,//"fw9DK7mEIOMqfB9ZuzjTSyaF",//
    callbackURL  : process.env.GOOGLE_CALLBACK_URL//"http://127.0.0.1:3000/auth/google/callback"//
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/system/#!/user',
        failureRedirect: '/system/#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        profile:{
                            first_name:profile.name.givenName,
                            last_name:profile.name.familyName
                        },
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}



var FacebookStrategy = require('passport-facebook').Strategy;
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/system/#!/user',
        failureRedirect: '/system/#!/login'
    }));
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,//'1425528574208033',//
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,//'76bf04432777c2953eb9f5a142e07d47',//
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/auth/facebook/callback'
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
function facebookStrategy(token, refreshToken, profile, done) {

    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (user) {
                return done(null, user);
            }
            else {
                var userDetails = {};
                userDetails.username = profile.displayName.replace(/ /g, '');
                userDetails.profile = {
                    first_name:profile.displayName.split(' ')[0],
                    last_name:profile.displayName.split(' ')[1]
                };
                userDetails.facebook = {id: profile.id, token: token};
                return userModel.createUser(userDetails);
            }
        }, function (err) {
            return done(err);
        })
        .then(function (user) {
            if (user) {
                return done(null, user);
            }
        }, function (err) {
            return  done(err);
        });

}



app.post("/api/user", getUsers);
app.get("/api/user",findAll);
app.get("/api/user/:userId",findUserById);
app.get("/api/user/:userId/populateappointments",findAllAppointmentsByUserId);
app.post("/api/user/create", createUser);
app.put("/api/user/:userId", updateUser);
app.post("/api/upload",upload.single('myFile'), uploadImage);
app.delete("/api/user/:userId", deleteUser);
app.post("/api/login",passport.authenticate('local'), login);
app.get("/api/checkLogin",checkLogin);
app.get("/logout", logout);


function logout(req, res){
    req.session.destroy(function (err) {
        res.redirect('/system/#!/');
    });
}

function checkLogin(req,res) {
    res.send(req.isAuthenticated() ? req.user: undefined);
}






/*function googleStrategy(token, refreshToken, profile, done) {
 userModel
 .findUserByGoogleId(profile.id)
 .then(function (user) {
 if(user)    {
 return done(null,user);
 }
 else    {
 var gemail = profile.emails[0].value;
 var parts = gemail.split('@');
 var newGoogleUser = {
 username:parts[0],
 email:gemail,
 profile:{
 first_name:profile.name.givenName,
 last_name:profile.name.familyName
 },
 google: {
 id:    profile.id,
 token: token
 }};
 return userModel.createUser(newGoogleUser);
 }
 }, function (err) {
 console.log(err);
 if(err) {
 return done(err);
 }
 })
 .then(function (user) {
 return done(null, user);
 }, function (err) {
 if(err) {
 return done(err);
 }
 })
 }*/

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username,password)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function login(request, response){
    var user =request.user;
    response.json(user);
}





function uploadImage(req, res) {

    var myFile        = req.file;

    var userId        = req.body.userId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    var photourl     = '/system/uploads/'+filename;

    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.profile.image_url=photourl;
            userModel
                .updateUser(userId, user)
                .then(function (status) {
                    var callbackUrl = "/system/#!/edit";
                    res.redirect(callbackUrl);
                }, function (err) {
                    console.log(err);
                    return err;
                });
        });
}

function callback(err, result) {
     if(err) {
         console.log(err);
     }
     else {
         //console.log(result);
         return result;
     }
}

function getUsers(request, response) {
    var body =request.body;
    var npi = body.npi;
    var username = body.username;
    var password = body.password;
    var userType = body.userType;
    // var npi = request.query.npi;
    // var username = request.query.username;
    // var password = request.query.password;
    // var userType = request.query.userType;
    // if (username && password)   {
    //     findUserByCredentials(request, response);
    // }
    if (username && userType)  {
        //findUserByUsernameAndUserType(name, uType)
        findUserByUsernameAndUserType(request, response);
    }
    else if (username)  {
        findUserByUsername(request, response);
    }else if(npi)   {
        findUserByNPI(request, response);
    }
    else    {
        findAll(request, response);
    }
}

// function findUserByCredentials(request, response)  {
//     userModel
//         .findUserByCredentials(
//             request.query.username
//             , request.query.password)
//         .then(function (user) {
//             console.log(user);
//             response.json(user);
//             return;
//         }, function (err) {
//             response.sendStatus(404).send(err);
//             return;
//         });
// }

function findUserByUsername(request, response) {
    userModel
        .findUserByUsername(request.body.username)
        .then(function (user) {
            console.log(user);
            response.json(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function findUserByNPI(request, response) {
    userModel
        .findUserByNPI(request.body.npi)
        .then(function (user) {
            //console.log(user);
            response.json(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}

function findUserByUsernameAndUserType(request, response) {
    userModel
        .findUserByUsernameAndUserType(request.body.username, request.body.us)
        .then(function (user) {
            console.log(user);
            response.json(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}
function findAll(request, response) {
    return userModel
        .findAll()
        .then(function (user) {
            console.log(user);
            return response.json(user);
        });
}

function findUserById(request, response) {
    //console.log(request.params.userId)
    return  userModel
        .findUserById(request.params.userId)
        .then(function (user) {
            response.json(user);
        });
}

function findAllAppointmentsByUserId(request, response) {
    //console.log(request.params.userId)
    return  userModel
        .findAllAppointmentsByUserId(request.params.userId)
        .then(function (user) {
            response.json(user);
        });
}

function createUser(request, response) {
    var newuser = request.body;
    //console.log("user service")
    //console.log(newuser);

    userModel
        .createUser(newuser)
        .then(function (user){
            console.log(user);
            response.json(user);
            // $http.post("/api/login", {username:user.data.username, password:user.data.password});
        });
    //return;
}

function updateUser(request, response) {
    var userId = request.params.userId;
    var user = request.body;
    //console.log([user, userId]);

    userModel
        .updateUser(userId,user)
        .then(function (status){
            //console.log(status);
            response.json(status);
        },function (err){
            //console.log(err);
            response.sendStatus(404).send(err);
        });
    return;
}

function deleteUser(request, response) {
    var userId = request.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (user) {
            response.send("200");
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    return;
}