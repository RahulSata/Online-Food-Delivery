var mongoose = require('mongoose');

// make schema of book tabel
var bookSchema = mongoose.Schema({
	title :{
		type : String,
		required:true
	},
	genre:{
		type:String
	},
	description:{
		type: String
	},
	author:{
		type:String
	}
});

var Book = module.exports = mongoose.model('Book',bookSchema);
// now we can use Book from anwhere

module.exports.getBooks= function(callback,limit){
	Book.find(callback).limit(limit);
}

module.exports.getBookById= function(id,callback){
	Book.findById(id,callback);//Here it is FindBYid..... so take care
}