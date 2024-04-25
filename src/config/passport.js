import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { regModel } from './regschema.js';
// import passport from 'passport';

// load regModel

 export const verification = (passport)=>{
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            // find user
         regModel.findOne({email:email})
           .then(user=>{
            if(!user){
                return done(null,false,{message:'That email is not registered'});
            }
            // match password
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;

                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false,{message:'Password Incorrect'})
                }
            })
           })
           .catch(err=>console.log(err))
        })
    )
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser((id, done) => {
        regModel.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err, null);
            });
    });
}