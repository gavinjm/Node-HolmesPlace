var DB = require('../config/db').DB;

console.log('Model.js Stub: 2) Mapping the user model in bookshelf');
var User = DB.Model.extend({
	tableName: 'users',
    idAttribute: 'id'
});

console.log('Model.js Stub: 9) Creating Model User');
module.exports = {
   User: User
};