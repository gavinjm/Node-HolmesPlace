// vendor libraries
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// custom libraries
// routes
var route = require('./routes/route');

// model
var Model = require('./models/model');

  
var app = express();


passport.use(new LocalStrategy(function(username, password, done) {
	new Model.User({username: username}).fetch().then(function(data) {
      var user = data;
	  if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
		 if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});
//
// Configure the app variable
//
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// SET STATIC PATHS
// Set up static directories with virtual mount points in express
app.use('/css' , express.static(__dirname + '/views/stylesheets/css'));
app.use('/fonts' , express.static(__dirname + '/views/stylesheets/fonts'));
app.use('/javascript' , express.static(__dirname + '/views/stylesheets/js'));
app.use('/images', express.static(__dirname + '/views/images'));
app.use('/icons', express.static(__dirname + '/views/icons'));
app.use('/partials', express.static(__dirname + '/views/partials'));
app.use('/resources', express.static(__dirname + '/resources'));		
 
// Set Global app path
global.appRoot = path.resolve(__dirname);

//
app.use(favicon(__dirname + '/views/icons/dachshund.ico'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());

///////////// routes ///////////////
// GET default, home and index routes
app.get('/', route.index);
app.get('/home', route.index);
app.get('/index', route.index);
// signin - GET
app.get('/signin', route.signIn);

// signin - POST
app.post('/signin', route.signInPost);

// signup - GET
app.get('/signup', route.signUp);

// signup - POST
app.post('/signup', route.signUpPost);
// logout - GET
app.get('/signout', route.signOut);

// profile - GET
app.get('/profile', route.profile);

//******** Holmes Place Routes ********/
//Weather - GET
app.get('/weather', route.weather);

//Accounting App - GET
app.get('/accounts', route.accounts);

//PHPMyAdmin - GET
app.get('/phpmyadmin', route.phpmyadmin);

//********* Local Routes ************/
//Fishing Lures - Get
app.get('/fishinglures', route.fishinglures);
//Music - Get
app.get('/music', route.musicindex);
//Ebooks - get
app.get('/ebooks', route.ebooksindex);
//sheetmusic - Get
app.get('/sheetmusic', route.sheetmusicindex);
// Recipes - Get
app.get('/recipes', route.recipesindex);
// note - GET
app.get('/note', route.addNote);
//app.get('note', route.addNotePost);

/********************************/

/********************************/
// 404 not found
app.use(route.notFound404);


var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;

   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});

