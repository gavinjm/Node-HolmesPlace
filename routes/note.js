var Model = require('../models/note');

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
/*	addNotePost
*	
*	req: email, topic, content, date
*	res: requests route to addNote 
*	Sanitizes POST data
*	Saves note to database
* 	No checking done for duplicate entries.
*/
var addNotePost = function(req, res, next){
	var bd = req.body;
	var user = req.user;
	if(user !== undefined) {
         user = user.toJSON();
		 console.log("User at ADD Note get : " + user.username);
      } else { user = "not defined" }
// Perform checks on the form fields.	  
	req.checkBody('email','E-Mail address required').notEmpty();
	req.checkBody('date','Date is required').notEmpty();
	
	//Trim and escape the name field. 
    req.sanitize('email').escape();
    req.sanitize('email').trim();
	req.sanitize('topic').escape();
	req.sanitize('content').escape();
	
	//Trim and escape the name field. 
    req.sanitize('date').escape();
    req.sanitize('date').trim();
	
	var errors = req.validationErrors();
	if (errors){
		res.render('showNote', {title: 'Errors'});
	} else 	{ // No errors create and save the note object
			var newNote = new Model.Note({
			date: bd.date,
			email: bd.email,
			topic: bd.topic,
			content: bd.content
		});
		newNote.save().then(function(model) {
            // Go back to add note
            addNote(req, res, next);
         });
		
	}
};

// Notes
//Get
module.exports.addNote = addNote;
//Post
module.exports.addNotePost = addNotePost;