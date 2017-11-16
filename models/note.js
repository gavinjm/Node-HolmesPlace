var DB = require('../config/db').DB;

var Note = DB.Model.extend({
	tableName: 'notes'
	});


module.exports = {
 Note: Note
};