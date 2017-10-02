/**
 * Created by prasadtajane on 7/27/17.
 */

var app = require("../../express");
var userModel = require("../model/user/user.model.server");

var users = [];

app.get("/api/profile", getUsers);
app.get("/api/profile/:userId",findUserById);
app.post("/api/profile/", createUser);
app.put("/api/profile/:userId", updateUserByUserId);
app.delete("/api/profile/:userId", deleteUserByUserId);

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
    var username = request.query.username;
    var password = request.query.password;
    if (username && password)   {
        findUserByUsernameAndPassword(request, response);
    }
    else if (username)  {
        findUserByUsername(request, response);
    }
    else    {
        getAllUsers(request, response);
    }
}

function findUserByUsernameAndPassword(request, response)  {
    userModel
        .findUserByCredentials(
            request.query.username
            , request.query.password)
        .then(function (user) {
            console.log(user);
            response.json(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function findUserByUsername(request, response) {
    userModel
        .findUserByUsername(request.query.username)
        .then(function (user) {
            console.log(user);
            response.json(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function getAllUsers(request, response) {
    userModel
        .findAll(callback)
        .then(function (user) {
            response.json(user);
        });
}

function findUserById(request, response) {
    //console.log(request.params.userId)
    return  userModel
        .findUserById(request.params.userId, callback)
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
        });
    //return;
}

function updateUserByUserId(request, response) {
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

function deleteUserByUserId(request, response) {
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