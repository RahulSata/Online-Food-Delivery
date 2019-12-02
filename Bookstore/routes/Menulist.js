var express = require('express');
var app = express();
var menuka = require('../Models/menu');
var router = express.Router();
const querystring = require('querystring');
const multer = require('multer');
//const upload = multer({dest:'/uploads/'});
var cors = require('cors');
app.use(cors());
router.post('/add_menu',function(req,res){
	var item = new menuka(req.body);
	item.save(function(err)
	{
		if(err){
			throw err;
		}
		console.log("One record insert");
		res.json({ success: true });
	});
});



router.get('/list',function(req,res,next)
{
        menuka.find(function(err,menu){
        if(err){
         res.send(err);
        }
        res.json(menu);
    });
});


router.post('/itemlist',function(req,res,next)
{

	res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Contetnt-Type,Authorization,Content-Length,X-Requested-With');
    var rest = req.body;
    console.log("hudddddddshsadasdasd");
    console.log(req.body.rest_name);
	menuka.find({res_name:rest.rest_name},function(err,menu){
        if(err){
         res.send(err);
        }
        res.json(menu);
    });
});

router.get('/delete/:res_name', (req, res) => {
	console.log(req.body.res_name);
  menuka.findOneAndDelete({res_name: req.body.res_name},(err, menu) => {
    if (err){throw err;}
    console.log("Record deleted");
    res.json(menu);
  })
});

module.exports = router;