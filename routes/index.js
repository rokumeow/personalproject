var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var url = "mongodb://localhost:27017/";
var character = require('../controllers/characters');
var event = require('../controllers/events');
var initDB= require('../controllers/init');
var story = require('../controllers/userstory');
var comments = require('../controllers/comments');
var search = require('../controllers/search');
initDB.init();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    var user=req.session.user;
    console.log(user);
    res.render('index', {"islogin" : true, "name": user });
  }else{
    res.render('index', { "islogin": false, "name":"" });
  }

});

router.get('/logout', function (req, res, next) {
  req.session.user = null;
  res.render('login');
});

router.get('/login', function (req, res, next) {
  res.render('login', {title: 'login'});
});

router.post('/login', function (req, res, next) {
  console.log(req.body);
  var username = req.body["username"];
  var password = req.body["password"];
  character.login(username ,res, function(data){
    console.log(data);
    if (data.length > 0  && (password === data[0]["user_password"])) {
      req.session.user = username;
      console.log("login successful");
      res.send({"results":"success"});
    }
    else{
      console.log("login rejected");
      res.send({"results":"fail"});
    }
  });
});

router.post('/signin', character.insert,function (req, res, next) {
  console.log("sign");
  console.log(req.body);
  res.render('signin', {title: 'signin'});
});

router.get('/signin', function (req, res, next) {
  res.render('signin', {title: 'signin'});
});

router.post('/createvent', event.insert, function (req, res,next) {
  res.render('createvent',{title: 'createvent'})
  // var UserStory = req.body;
  // console.log(UserStory);
});

router.get('/createvent', function (req, res,next) {
  if(req.session.user){
    var user=req.session.user;
    console.log(user);
    res.render('createvent', {"islogin" : true, "name": user });
  }else{
    res.render('createvent', { "islogin": false, "name":"" });
  }
});

router.post('/createblog',  story.insert, function (req, res,next) {
  res.render('createblog',{title: 'createblog'})
  var UserStory = req.body;
  console.log(UserStory);
});

router.get('/createblog', function (req, res,next) {
  if(req.session.user){
    var user=req.session.user;
    console.log(user);
    res.render('createblog', {"islogin" : true, "name": user });
  }else{
    res.render('createblog', { "islogin": false, "name":"" });
  }
});

router.post('/event', function (req, res,next) {
  res.render('event',{title: 'event'})
});

router.get('/event', function (req, res,next) {
  event.addEvent(req,res,function (data) {
    var datastring = JSON.stringify({"results":data});

    if(req.session.user){
      var user=req.session.user;
      console.log(user);
      res.render('event', {"islogin" : true, "name": user, 'data':datastring });
    }else{
      res.render('event', { "islogin": false, "name":"", 'data':datastring });
    }
  });
});

router.post('/blog', function (req, res,next) {
  res.render('blog',{title: 'blog'})
});

router.get('/blog', function (req, res,next) {
  story.addBlog(req,res,function (data) {
    var datastring = JSON.stringify({"results":data});

    if(req.session.user){
      var user=req.session.user;
      console.log(user);
      res.render('blog', {"islogin" : true, "name": user, 'data':datastring });
    }else{
      res.render('blog', { "islogin": false, "name":"", 'data':datastring });
    }
  });
});

router.post('/location', function (req, res,next) {
  res.render('location',{title: 'location'})
});

router.get('/location', function (req, res,next) {
  event.addEvent(req,res,function (data) {
    var locations = [];
    var location={};
    if(data.length>0){
      for(var i = 0; i< data.length; i++){
        var lat = parseFloat(data[i].Lat) ;
        var lng = parseFloat(data[i].Lng);
        location={lat:lat,lng:lng};
        // console.log(location)
        locations.push(location);
        // console.log(locations);
      }
      var locationstring = JSON.stringify(locations);
    }
    var datastring = JSON.stringify(data);
    console.log(datastring);
    if(req.session.user){
      var user=req.session.user;
      console.log(user);
      res.render('location', {"islogin" : true, "name": user, 'data':datastring, 'locations':locationstring });
    }else{
      res.render('location', { "islogin": false, "name":"", 'data':datastring, 'locations':locationstring });
    }
  });
});

router.post('/account', function (req, res,next) {
  res.render('account',{title: 'account'})
});

router.get('/account', function (req, res,next) {
  res.render('account',{title: 'account'})
});

router.post('/search', function (req, res,next) {
  var query = req.body;
  console.log("query contents");
  console.log(query);
  if (query["type"] == "blog"){
    search.inblog(query["keywords"],res, function(data){
      console.log("returned data");
      console.log(data);
      res.send({"results":data});
    });
  }
  if (query["type"] == "event"){
    search.inevent(query["keywords"],res, function(data){
      //console.log("returned data");
      //console.log(data);
      res.send({"results":data});
    });
  }

});

router.get('/search', function (req, res,next) {
  res.render('search',{title: 'search'})
});

router.post('/comment', comments.insert,function (req, res, next) {
  res.render('comment', {title: 'comment'})
});

router.get('/comment', function (req, res, next) {
  comments.addComment(req,res,function (data) {
    var datastring = JSON.stringify({"results":data});
    if(req.session.user){
      var user=req.session.user;
      console.log(user);
      res.render('comment', {"islogin" : true, "name": user, 'data':datastring });
    }else{
      res.render('comment', { "islogin": false, "name":"", 'data':datastring });
    }
  });
});


/* GET users listing. */
/*router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});*/

module.exports = router;