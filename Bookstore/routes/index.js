const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();


// badhi file ma jarur nathi aa db banavavani... khali Book no object banavi devano k je file ma aeni schema hoy.....

User = require('../Models/userlogin');
//Session = require('../Models/session');


const sessionSchema = mongoose.Schema({
    sessionID: String,
    userID: String,
    userName: String,
});
const Session = mongoose.model("Session", sessionSchema);



router.use(cors({credential: true}));
router.use(cookieParser());
router.use(bodyParser.json());
router.use(session({secret: "Your secret key"}));

var sess;
router.get('/sessions',function(req,res,next)
{
    Session.find(function(err,userlogin){ 
        if(err){
         res.send(err);
        }
        res.json(userlogin);
    });
});

router.post('/setsession',function(req,res){
    console.log(req.body.username);
    var Onesession = new Session({userName:req.body.username});
    //var user = req.body;
	
	Onesession.save(function(err)
	{
		if(err){
			throw err;
		}
		console.log("One record insert to sessions");
		res.json({ success: true });
	});
});


router.get('/users',function(req,res,next)
{
    User.find(function(err,userlogin){
        if(err){
         res.send(err);
        }
        res.json(userlogin);
    });
});

router.post('/authenticate',function(req,res){
    var user=req.body;
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Contetnt-Type,Authorization,Content-Length,X-Requested-With');

    User.findOne({name:user.username,password:user.password},function(err,founduser){
			if(founduser)
			{
                console.log("User is:"+founduser);
                var date = new Date();
                var t = date.getMilliseconds();
                var sessID = t.toString() + founduser._id;
                console.log("ID IS :" + sessID);
                const newSession = new Session({
                    sessionID: sessID,
                    userName: founduser.name
                });
                newSession.save(function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
                res.json({status: true, msg: 'Successfully logged in',user:founduser[0], sessionID: sessID,"red":"menu"});
            }
            else{
                console.log("Invalid");
                res.json({status: false, msg: 'Wrong Username or Password',"red":"login"});
                }
        })
});

router.post('/getUser', function (req, res) {
    const sessionID = req.body.sessionID;
    if (sessionID) {
        Session.find({sessionID: sessionID}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json({status: true, user: data[0]});
                res.end();
            }
        })
    }
});

router.post('/getSession', function (req, res) {
    const sessionID = req.body;
    if (sessionID.sessionID) {
        Session.find({sessionID: sessionID.sessionID}, function (err, session) {
            if (err) {
                console.log('error' + err);
                res.end();
            } else {
                if (session.length > 0) {
                    res.json({status: true, session: session[0]});
                } else {
                    res.json({status: false});
                }
                res.end();
            }
        });
    } else {
        res.json({status: false});
        res.end();
    }
});


router.post('/logout', function (req, res) {
    const sessionID = req.body;
    console.log(sessionID);
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
        console.log("Not in session");
        res.json({status: false});
        res.end();
    }
});


const cartitem = mongoose.Schema({
    item_name: String,
    userID: String
});
const Cart = mongoose.model("Cart", cartitem);

router.get('/all_cart',function(req,res,next)
{
    Cart.find(function(err,all_cart){ 
        if(err){
         res.send(err);
        }
        res.json(all_cart);
    });
});

router.post('/add_to_cart',function(req,res,next){
    sessionID = req.body;
    Item= req.body;
    console.log(Item);
    
    //console.log("hii");
    console.log(sessionID);
    //console.log("hiiiii");
    var itemname = new Cart({item_name:req.body.item_name,userID:req.body.uId});
	itemname.save(function(err)
	{
		if(err){
			throw err;
		}
		console.log("One record insert to Cart");
		res.json({ success: true });
	});
});

module.exports = router;