var mongoose = require('mongoose');

// make schema of book tabel
var genreSchema = mongoose.Schema({
	name :{
		type : String,
		required:true
	}
	
});

var Genre = module.exports = mongoose.model('Genre',genreSchema);
// now we can use mybooks from anwhere

module.exports.getGenres= function(callback,limit){
	Genre.find(callback).limit(limit);
}