const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
//ClintID 208477398781-aoee5f5c8ru03jthiile1trjah0egb7e.apps.googleusercontent.com
//CLineSecrete JbD21ZOwah-D4aLCuHSWpzqz
const User = require('./user-model')

//node sends
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
//user send 
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})


passport.use(
    new GoogleStrategy({

        callbackURL:'http://localhost:4000/auth/google/redirect',
        clientID:'208477398781-aoee5f5c8ru03jthiile1trjah0egb7e.apps.googleusercontent.com',
        clientSecret:'ufPvTKRsGu3y9A4GlUyLETBf'

    },(accessToken,refreshToken,profile,done)=>{    
        console.log("Callback")
        
        console.log("Profile successfully loaded")
        //console.log(profile)
        
        User.findOne({googleID:profile.id}).then((currentUser)=>{
            if(currentUser){
                //console.log(currentUser)
                done(null,currentUser)
            }else{
                new User({
                    username:profile.displayName,
                    googleID:profile.id
                }).save().then((newUser)=>{
                    //console.log("new user"+newUser)
                    done(null,newUser);
             });

            }
        });
        
    })

)

