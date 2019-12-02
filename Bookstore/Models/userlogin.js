var mongoose = require('mongoose');

// make schema of book tabel
var UserSchema = mongoose.Schema({
	name :{
		type : String,
		required:true
	},
	password:{
		type : String,
		required:false
    }
});

var UserList = module.exports = mongoose.model('UserList',UserSchema);