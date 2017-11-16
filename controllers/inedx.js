/*
*	index.js
*	index controller file for the app router
*	imports other controllers
*/
var express = require('express')
  , router = express.Router()

 var express = require('express')
  , router = express.Router()

router.use('/note', require('./note'))
/*
 router.use('/music', require('./music'))

router.get('/', function(req, res) {
  res.send('Home page')
})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})
*/

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

//******************* NOTES ******************//
// note - GET
app.get('/note', note.addNote);
// note - POST
app.post('/note',note.addNotePost);


module.exports = router