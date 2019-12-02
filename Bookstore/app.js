var express = require('express');
var app = express();
var bodyParser = require('body-Parser');
var mongoose = require('mongoose');
var router = express.Router();
var path = require('path');
var cors = require('cors');
var session = require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router.use(cors({credential: true}));
router.use(session({secret: "SECRETTTT"}));
mongoose.connect("mongodb://localhost/Bookstore",{useNewUrlParser : true});
var db = mongoose.connection;
app.use(cors());
Book = require('./Models/books');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//set static folder
app.listen(3000);


var index = require('./routes/index');
//var userlogin = require('./routes/User');
var menulisttable = require('./routes/Menulist');
app.use('/',index);
//app.use('/userlogin',userlogin);
app.use('/menulist',menulisttable);
console.log("Runing on port 3000");