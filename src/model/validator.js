import { RegisLoginModel } from "./loginandregmodel.js";

 export const validator = async(req,res)=>{
const {name,email,password,password2} = req.body;
            let errors = [];
            if(!name||!email||!password||!password2){
                errors.push({msg:'Please fill in all the fields'});
            
            // check password match
            if(password!=password2){
                errors.push({msg:"Passwords not match"})
            }
            if(password.length<8){
              errors.push({msg:"Password must contain 8 charcaters"})
            }
            if(errors.length > 0){
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }
        }else{
           const result = await RegisLoginModel.savedData(req.body);
           if(!result.data){
               errors.push({msg:result.msg});
               res.render('register',{
                errors,
                name,
                email,
                password,
                password2
            })
           }
           else{
            req.flash('success_msg', 'You are now registered and can login')
            res.redirect('login');
           }
                }
                
            
        }