const express = require('express');
const app = express();
const profileRoutes = require('./profile')

const authRoutes = require('./authroutes')
const passport_Setup = require('./passport-setup')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session');
const passport = require('passport')

var url = "mongodb://u7ehgyjt3zarc3h:lzdlv20kbLLYtJlekg43@bdgt0ets7z2gj71-mongodb.services.clever-cloud.com:27017/bdgt0ets7z2gj71";


app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:["Iampawan"]
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/profile',profileRoutes);
app.use('/auth',authRoutes);


mongoose.connect(url,()=>{
    console.log("Mongo Connected")
})

app.get('/',(req,res)=>{
    res.send(req.user)
})

app.listen(4000,()=>{
    console.log("App is now listning for request on port 3000")
});

