const router = require('express').Router();
const passport = require('passport')


router.get('/login',(req,res)=>{
    //res.send('login')
    res.send(req.user)

})

router.get('/google',passport.authenticate('google',{
    
    scope:['profile']

}))

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    //res.redirect('/profile/')
    res.redirect('/profile/')
})

router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/auth/google')
})

module.exports = router