// vendor library
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
// console.log('route.js Stub:4)....');
// custom library
// model
var Model = require('../models/model');
// console.log('route.js Stub:8)....');
//
// index
var index = function(req, res, next) {
   var user = req.user;
     if(user !== undefined) {
         user = user.toJSON();
      }  
      
     res.render('index', {title: 'Holmes Place',user: user} );   
 };
 
 // EBooksIndex - GET
 var ebooksindex = function(req,res,next){
  var items = [];			// Empty array
  var path = "resources/ebooks";	// Path to ebooks
  var user = "default";
   if (!req.isAuthenticated()){
         res.redirect('/signin');
       } else {
       var user = req.user;
       if(user !== undefined) {
         user = user.toJSON();
      }
    items = walksync(path, items);
	// Remove files from the array
     // display E-Books with libnks to open them
     res.render('ebooks_index', {title: 'E-Books',user: user, filelist: items});
	   }
 }
 // Recipe_index - GET
  var recipesindex = function(req,res,next){
  var items = [];					// Empty array
  var path = "resources/recipes";	// Path to ebooks
  var user = "default";
   if (!req.isAuthenticated()){
         res.redirect('/signin');
       } else {
       var user = req.user;
       if(user !== undefined) {
         user = user.toJSON();
      }
    items = walksync(path, items);
     // display recipes with links to open them
     res.render('recipes_index', {title: 'Recipes',user: user, filelist: items});
	   }
 }
 // sheetmusiIndex - GET
 var sheetmusicindex = function(req,res,next){
  var items = [];			// Empty array
  var path = "resources/sheetmusic";	// Path to sheetmusic
  var user = "default";
//  console.log("route.js: 25 -> Web Site Root directory: " + __dirname);
  
   if (!req.isAuthenticated()){
         res.redirect('/signin');
       } else {
       var user = req.user;
       if(user !== undefined) {
         user = user.toJSON();
      }
			items = walksync(path, items);
			// display Sheetmusic with links to open them
			res.render('sheetmusic_index', {title: 'Sheet Music',user: user, filelist: items});
	   }
 }
 
 // Music Index - GET
var musicindex = function(req, res, next){
   var items = [];        				// Empty array
   var path = "resources/music";     	// Path to the music files
   var user = "default";
   //var path = "C:\\Users\\Gavin\\Documents\\Sheet Music";
   
//Extract file extension for icon displays

   if (!req.isAuthenticated()){
         res.redirect('/signin');
       } else {
       var user = req.user;
       if(user !== undefined) {
         user = user.toJSON();
      }
	  // Lets see what is in the path
	   items = walksync(path,items);
      // User is authenticated render the page
      res.render('music_index', {title: 'Music Files', user: user, filelist: items}); 
   }
};

// Reads files in the music dir recursivley in a synchronous fashion
// No filtering is done on files, this is so the function can be used for all file types.
var walksync = function(dir, filelist){
    var fs = fs ||  require('fs'),
      files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()){
            filelist = walksync(dir + '/'+ file, filelist);
        } else {
            filelist.push(file);
        } 
       });
  return filelist;     
};

// addNote - GET
var addNote = function(req, res, next){
if(!req.isAuthenticated()) res.redirect('/signin');
 // Send across the date timestamp for the note as well as the username
 var user = req.user;
     if(user !== undefined) {
         user = user.toJSON();
      } else { user = "not defined" }  
 var notetime = new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
  replace(/\..+/, '')     // delete the dot and everything after
  
 res.render('addNote', {title: 'New Note', user: user, notetime: notetime });

};

var addNotePost = function(req, res, next){
 res.render('showNote', {title: '.....Details of new note'});

};
// sign in - GET
var signIn = function(req, res, next) {
   if(req.isAuthenticated()) res.redirect('/');
   res.render('signin', {title: 'Sign In'});
};

// sign in- POST
var signInPost = function(req, res, next) {
   passport.authenticate('local', { successRedirect: '/',
                          failureRedirect: '/signin'}, function(err, user, info) {
          console.log('Authenticating: User : ' + user.username +  '  Password: ' + user.password);
      if(err) {
		 console.log('Authentication Error: User : ' + user.username +  '  Password: ' + user.password); 
         return res.render('signin', {title: 'Sign In', errorMessage: err.message});
      } 

      if(!user) {
		console.log('Authentication Error for : User : ' + user.username +  '  Password: ' + user.password);
         return res.render('signin', {title: 'Sign In', errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
		  console.log('Logging In: User : ' + user.username +  '  Password: ' + user.password);
         if(err) {
			 console.log('Authentication Error : User : ' + user.username +  '  Password: ' + user.password);
            return res.render('signin', {title: 'Sign In', errorMessage: err.message});
         } else {
			 console.log('Authentication success for : User : ' + user.username +  '  Password: ' + user.password);
            return res.redirect('/');
         }
      });
   })(req, res, next);
};

// sign up - GET
var signUp = function(req, res, next) {
   if(req.isAuthenticated()) 
   {
      res.redirect('/');
   } 
   else {
      res.render('signup', {title: 'Sign Up'});
   }
};

// sign up - POST
var signUpPost = function(req, res, next) {
   var user = req.body;
   
   var usernamePromise = null;
   usernamePromise = new Model.User({username: user.username}).fetch();
   console.log('User: ' + user.username +  'Password: ' + user.password);
	return usernamePromise.then(function(model) {
      if(model) {
         res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
      } else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         var password = user.password;
         var hash = bcrypt.hashSync(password);
			
         var signUpUser = new Model.User({username: user.username, password: hash,email: user.email});

         signUpUser.save().then(function(model) {
            // sign in the newly registered user
            signInPost(req, res, next);
         });	
      }
   });
};

// sign out - GET
var signOut = function(req, res, next) {
      req.logout();
      res.redirect('/index');
  
};

// 404 not found
var notFound404 = function(req, res, next) {
   res.status(404);
   res.render('404', {title: '404 Not Found'});
};

// profile - GET
var profile = function(req, res, next){
    if(!req.isAuthenticated())
       {
      res.redirect('/signin');
       }  else {
      var user = req.user;
      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('profile', {title: 'Display Profile', user: user});
   } 
};

var fishinglures = function(req, res, next){
    if (!req.isAuthenticated()){
         res.redirect('/signin');
       } else {
       var user = req.user;
       res.render('fishinglures', {title: 'Fishing Lure Manufacturer', user: user});
   }  
};

/// External SITE links ///////////
// weather site - GET
var weather = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
      // Redirect to Holmes PLace weather:  http://localhost:9090/HolmesPlace/Weather/
      res.redirect('http://localhost:9090/HolmesPlace/Weather/'); 
    }
}
// Accounting Site - GET
var accounts = function(req, res, next){
 if (!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
      // Redirect to Holmes PLace weather:  http://localhost:9090/HolmesPlace/Accounts/
      res.redirect('http://localhost:9090/HolmesPlace/Accounts/'); 
    }   
};

//PHP My admin no authentication required as authentication is implemented by the site.
var phpmyadmin = function (req, res, next) {
    
    res.redirect('http://localhost:9090/phpmyadmin');

};



// export functions
/**************************************/
// index
module.exports.index = index;
module.exports.musicindex = musicindex;
module.exports.ebooksindex = ebooksindex;
module.exports.sheetmusicindex = sheetmusicindex;
module.exports.recipesindex = recipesindex;
module.exports.addNote = addNote;
module.exports.addNotePost = addNotePost;

// Profile
module.exports.profile = profile;

//External sites
module.exports.weather = weather;
module.exports.accounts = accounts;
module.exports.phpmyadmin = phpmyadmin;

// signin in
// GET
module.exports.signIn = signIn;
// POST
module.exports.signInPost = signInPost;

// sign up
// GET
module.exports.signUp = signUp;
// POST
module.exports.signUpPost = signUpPost;

// sign out
module.exports.signOut = signOut;

// 404 not found
module.exports.notFound404 = notFound404;

//Fishing lures and music exports.
module.exports.fishinglures = fishinglures;
