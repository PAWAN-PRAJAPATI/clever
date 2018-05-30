const express = require('express');
const app = express();
const profileRoutes = require('./profile')
bodyParser = require('body-parser');

const authRoutes = require('./authroutes')
const passport_Setup = require('./passport-setup')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session');
const passport = require('passport')
const KEYS = require("./keys.js")
var url = (KEYS.MONGO.url);

const port = process.env.PORT || 4000

console.log(url)



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[KEYS.COOKIE.key]
}));

app.use(passport.initialize());
app.use(passport.session());

/*

app.all('/auth', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
},authRoutes);


app.all('/profile', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
},profileRoutes);
*/

app.use('/profile',profileRoutes);
app.use('/auth',authRoutes);


mongoose.connect(url,()=>{
    console.log("Mongo Connected")
})

app.get('/',(req,res)=>{
    res.send(req.user)
})

app.listen(port,()=>{
    console.log("App is now listning for request on port "+port)
});

