var express = require('express');
var app = express();
User = require('../Models/userlogin');
var router = express.Router();
const querystring = require('querystring');
var session = require('express-session');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.use(session({secret: "SECRETTT"}));

var cors = require('cors');
app.use(cors({credential: true}));
router.get('/users',function(req,res,next)
{
    User.find(function(err,userlogin){
        if(err){
         res.send(err);
        }
        res.json(userlogin);
    });
});
var sess;
router.post('/users/auth',function(req,res){
    var user=req.body;
    
    User.findOne({name:user.username,password:user.password},function(err,founduser){
			if(founduser)
			{
                res.json({"red":"menu"});
            }
            else{
                res.json({"red":"login"});
                }
        })
});



router.get('/logout',function(req,res,next){
    const sessionID = req.body;
    if (sessionID.sessionID) {
        Session.remove({sessionID: sessionID.sessionID}, function (err, data) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.json({status: true});
                res.end();
            }
        });
    } else {
        res.json({status: false});
        res.end();
    }
})

function isValidUser(req,res,next){
    if(req.isAuthenticated()){next();}
    else{
        return res.status(401).json({message:'unauthorized user'});
    }
}
router.post('/users/adduser',function(req,res){
    //console.log("Hi");
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Contetnt-Type,Authorization,Content-Length,X-Requested-With');
    console.log(req.body.username);
    var user = new User({name:req.body.username,
                        password:req.body.password
    });
	
	user.save(function(err)
	{
		if(err){
			throw err;
		}
		console.log("One record insert");
		res.json({ success: true });
	});
});

router.post('/userall',function(req,res,next)
{
    User.find(function(err,userlogin){
        if(err){
         res.send(err);
        }
        res.render('http://localhost:4200/login',{user:userlogin});
    });
});

module.exports = router;