console.log('db.js Stub:12)...');

// var Bookshelf = require('bookshelf')('knex')({client: 'mysql'});

//console.log('db.js Stub:16) Init var Bookshelf');

//module.exports.DB = Bookshelf;
var Bookshelf = require('bookshelf');

var config = {
   host: 'localhost',   			// Host
   user: 'gavin',       			// Database user
   password: 'heaven',  			// Database password
   database:'holmes_place',			// database: 'dbUsers', // Database
   charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
   client: 'mysql', 
   connection: config
});


module.exports.DB = DB;


