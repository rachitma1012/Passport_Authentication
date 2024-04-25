import express from 'express'
import dotenv from 'dotenv';
import path from 'path';
import ejslayout from 'express-ejs-layouts';
import flash from 'connect-flash';
import expresssession from 'express-session';
import passport from 'passport';

import { router } from './src/routes/routes.js';
import { connectdb } from './src/config/databaseconnection.js';
import { verification } from './src/config/passport.js';
 dotenv.config()

const app = express();
 verification(passport)
app.use(express.urlencoded({extended:false}));
 app.use(express.json());
 app.use(expresssession({
    secret:'secret',
    resave:true,
    saveUninitialized:true
 }))

 app.use(passport.initialize());
 app.use(passport.session());
 app.use(flash());

 app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();
 })
app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'src','views'));
app.use(express.static('src/views'));
app.use(ejslayout)


app.use(router);

app.listen(process.env.PORT||5000,()=>{
    console.log("sever is running on port number 5000");
    
     connectdb();
})