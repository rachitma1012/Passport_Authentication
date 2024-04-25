import express from 'express';
import passport from 'passport';
// import bcrypt from 'bcrypt';
// import { regModel } from '../config/regschema.js';
import { validator } from '../model/validator.js';
import  ensureAuthenticated  from '../config/outh.js';

const router = express.Router();


router.get('/',(req,res)=>{
  return  res.render("welcome")
})
//dashboard
router.get('/dashboard',ensureAuthenticated.ensureAuthenticated,(req,res)=>{

    res.render('dashboard',{user:req.user.name})
})
// login 
router.get('/login',(req,res)=>{
   return res.render('login')
})
// register
router.get('/register',(req,res)=>{
   return res.render('register')
})
router.post('/register',validator);

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
})
// logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You are now logged out');
        res.redirect('login');
    });
});

// const hashpass = async(password)=>{

// await bcrypt.hash(password,12).then(()=>{
//     console.log('Password is hashed');
// });
// }
export {router};