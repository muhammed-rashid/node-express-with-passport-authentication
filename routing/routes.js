const express = require("express");
const router = express.Router();
const Joi = require('@hapi/joi');
const {registervalidate} = require('./schema/schema');
const bcrypt = require('bcrypt')
const user = require("./schema/user");
var passport = require('passport')

//miidle ware
router.use(express.json());
router.use(passport.initialize());


//routes
router.post('/register',async(req,res)=>{
    
     const {error} = registervalidate(req.body);
    if(error){ 
    return res.status(400).send(error.message);
   }
// hashing password
   salt =await bcrypt.genSalt();
   hashed =await bcrypt.hash(req.body.password,salt);

   //user already exist or not checking

   const emailexist = await user.findOne({email:req.body.email});
   if(emailexist)return res.status(400).send('also exist');
   
  
  //creating new user
   const newuser = new user({
    username:req.body.username,
    email:req.body.email,
    password:hashed,
   })
    newuser.save().then(()=>{
       res.send("created");
   }).catch((err)=>{
       throw err;
   })
 
});

router.get('/login',(req,res)=>{
    console.log('on login page');
    res.render("login");
});
router.get('/success',(req,res)=>{
    console.log('on login page');
    res.render("home");
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/success',
       
    })(req, res, next);
});


LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, console.log({ message: 'Incorrect username.' }));
      }
      if (!user.validPassword(password)) {
        return done(null, false, console.log({ message: 'Incorrect password.' }));
      }
      return done(null, user);
    });
  }
));



  



module.exports = router