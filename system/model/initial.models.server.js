/**
 * Created by prasadtajane on 8/4/17.
 */


var q = require('q');
var mongoose = require("mongoose");

var connectionString = 'mongodb://127.0.0.1:27017/cs5610'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds145312.mlab.com:45312/heroku_hk8k7m0j'; // user yours
}
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// above with your own URL given to you by mLab

var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;

module.exports = db;


var userSchema = new mongoose.Schema({
        username:String,
        password:String,
        firstName:String,
        lastName:String,
        email:String,
        contact:String,
        dateCreated:{type:Date,default:Date.now()},
        isAdmin:{type:Boolean, default:false}

    }, {     collection:"user"    });


var websiteSchema = mongoose.Schema({
        _user:String,
        name:String,
        description:String,
        pages:String,
        dateCreated:{type:Date, default:Date.now()}
    },  {
        collection:"website"
    });

var pageSchema = mongoose.Schema({
        _website:String,
        name:String,
        title:String,
        description:String,
        dateCreated:{type:Date, default:Date.now()}
    },  {
        collection:"page"
    });

var widgetSchema = mongoose.Schema({
    _page:String,
    widgetType:String,//enum
    name:String,
    text:String,
    placeholder:String,
    description:String,
    url:String,
    width:String,
    height:String,
    rows:Number,
    size:Number,
    class:String,
    icon:String,
    deletable:Boolean,
    formatted:Boolean,
    dateCreated:{type:Date, default:Date.now()}
},  {
    collection:"widget"
});



var users = [
    {username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "a@b.com", contact: 123,  isAdmin: true},
    {username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",     email: "a@b.com",  contact: 123  },
    {username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",     email: "a@b.com",  contact: 123  },
    {username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",    email: "a@b.com",  contact: 123  }
];

var pages = [
    { "name": "Post 1", "websiteId": "598794d21f784e669ef77978", "description": "Lorem", "visited": "15" },
    { "name": "Post 2", "websiteId": "598794d21f784e669ef77978", "description": "Lorem", "visited": "35" },
    { "name": "Post 3", "websiteId": "598794d21f784e669ef77978", "description": "Lorem", "visited": "45" }
];

var websites = [
    { "name": "Facebook",    "developerId": "456", "description": "Lorem", "visited": "2000" },
    { "name": "Tweeter",     "developerId": "456", "description": "Lorem", "visited": "3000" },
    { "name": "Gizmodo",     "developerId": "456", "description": "Lorem", "visited": "4000" },
    { "name": "Go",          "developerId": "123", "description": "Lorem", "visited": "5000" },
    { "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "visited": "6000" },
    { "name": "Checkers",    "developerId": "123", "description": "Lorem", "visited": "7000" },
    { "name": "Chess",       "developerId": "234", "description": "Lorem", "visited": "7500" }
];

var widgets = [
    { "name": "Heading1",   "widgetType": "HEADING",    "pageId": "598794d21f784e669ef77973",    "size": "2",    "text": "GIZMODO"},
    { "name": "Heading2",   "widgetType": "HEADING",    "pageId": "598794d21f784e669ef77973",    "size": "4",    "text": "Lorem ipsum"},
    { "name": "Image1",     "widgetType": "IMAGE",      "pageId": "598794d21f784e669ef77973",    "text": "lorempixel"
            , "width": "100%",     "url": "http://lorempixel.com/400/200/"},
    { "name": "Html1",      "widgetType": "HTML",       "pageId": "598794d21f784e669ef77973",    "text": "<p>Lorem ipsum</p>"},
    { "name": "Heading3",   "widgetType": "HEADING",    "pageId": "598794d21f784e669ef77973",    "size": "4",    "text": "Lorem ipsum"},
    { "name": "youtube1",   "widgetType": "YOUTUBE",    "pageId": "598794d21f784e669ef77973",    "text": "321"
            , "width": "100%",     "url": "https://youtu.be/syfUi_n-tv8" },
    { "name": "Html2",      "widgetType": "HTML",       "pageId": "598794d21f784e669ef77973",    "text": "<p>Lorem ipsum</p>"}
];


function callback(err, result)   {
    //console.log(err);
    //console.log(result);
}

function createUserCollection(users)  {


    function createUsers(arrayName) {
        var User = mongoose.model("profile", userSchema);

        for (a in arrayName)  {
            User.create({
                    username:arrayName[a].username,
                    password:arrayName[a].password,
                    firstName:arrayName[a].firstName,
                    lastName:arrayName[a].lastName,
                    email:arrayName[a].email,
                    contact:arrayName[a].contact,
                    isAdmin:arrayName[a].isAdmin,
                    dateCreated:arrayName[a].dateCreated
            }, callback)
        }
        console.log("Users Created!");
    }
    createUsers(users);
}

function createPageCollection(pages) {

    function createPage(pages)   {
        var Pages = mongoose.model("page", pageSchema);

        for (p in pages)  {
            Pages.create({
                _website:pages[p].websiteId,
                name:pages[p].name,
                title:pages[p].title,
                description:pages[p].description,
                dateCreated:pages[p].dateCreated
                },
                callback)
        }
        console.log("Pages Created!");
    }
    createPage(pages)
}

function createWebsiteCollection(websites) {

    function createWebsite(websites)   {
        var Websites = mongoose.model("website", websiteSchema);

        for (w in websites)  {
            Websites.create({
                    _user:websites[w].developerId,
                    name:websites[w].name,
                    description:websites[w].description,
                    pages:websites[w].pages,
                    dateCreated:websites[w].dateCreated
                },
                callback)
        }
        console.log("Websites Created!");
    }
    createWebsite(websites)
}


function createWidgetCollection(widgets) {

    function createWidgets(widgets)   {
        var Widgets = mongoose.model("widget", widgetSchema);

        for (w in widgets)  {
            Widgets.create({
                    _page:widgets[w].pageId,
                    widgetType:widgets[w].widgetType,//enum
                    name:widgets[w].name,
                    text:widgets[w].text,
                    placeholder:widgets[w].placeholder,
                    description:widgets[w].description,
                    url:widgets[w].url,
                    width:widgets[w].width,
                    height:widgets[w].height,
                    rows:widgets[w].rows,
                    size:widgets[w].size,
                    class:widgets[w].class,
                    icon:widgets[w].icon,
                    deletable:widgets[w].deletable,
                    formatted:widgets[w].formatted,
                    dateCreated:widgets[w].dateCreated
                },
                callback)
        }
        console.log("Widgets Created!");
    }
    createWidgets(widgets)
}

/*function findAll() {
    var User = mongoose.model("profile", userSchema);
    User.find(function (err, results) {
        console.log(results);
    });
}*/

//createUserCollection(users);
//createPageCollection(pages);
//createWebsiteCollection(websites);
//createWidgetCollection(widgets);
//findAll();