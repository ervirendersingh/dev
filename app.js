const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const bodyParser=require('body-parser');
const session = require('express-session');
const parseurl = require('parseurl')
const config = require('./config/database');
const passport = require('passport');
// db Connection
mongoose.connect(config.database);
let db = mongoose.connection;

// Check Connection
db.once('open', function(){
  console.log('connected to MongoDB');
})

// Check for db errors
db.on('error', function(err){
  console.log(err);
})

// Init app
const app = express();

//Load view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Set Public Folder
app.use(express.static(path.join(__dirname,'public')));

// Express session
app.use(session({
  secret:'keyboard cat',
  resave:true,
  saveUninitialized:true
}))


// Express Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// express Validator
app.use(expressValidator({
  errorFormatter:function(param,msg,value){
    var namespace=param.split('.')
    ,root = namespace.shift()
    ,formParam=root;

    while(namespace.length){
      formParam+='[' + namespace.shift() + ']';
    }
    return{
      param:formParam,
      msg:msg,
      value:value
    };
  }
}));

//Bring in passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.get('*', function(req,res,next){
  res.locals.user=req.user || null;
  next();
});

// Bring in models
let Articles = require('./models/articles');

// Home route
app.get('/', function(req,res){
   Articles.find({},function(err,Articles){
     if(err){
       console.log(err);
     }
     else{
     res.render('index',{
       title: 'Articles',
       articles: Articles
     });
   }
   });
});

//Addedd new commenr
// Route Files
let articles = require('./routes/articles');
app.use('/article',articles);
let users = require('./routes/users');
app.use('/users',users);

// Start server
app.listen(3000, function(){
  console.log("server started to listen");
})

//New Test Comment
//Test 2comment
