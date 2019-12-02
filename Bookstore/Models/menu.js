 var mongoose = require('mongoose');
//const upload = require({dest:'/uploads/'});
// make schema of book tabel
var MenuSchema = mongoose.Schema({
	res_name:{
		type : String
	},
	res_address:{
		type : String
		//required:true
    },
  
  img: { data: Buffer, contentType: String },
  
  item:{
   type:String
  },
  
  price:{
    type:String
  },

  item_count:{
            type:Number
            },
 
  mobileno:{
    type:String
    }
        
});

var MenuListtable = module.exports = mongoose.model('MenuListtable',MenuSchema);