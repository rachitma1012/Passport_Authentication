import bcrypt from 'bcrypt';
import { regModel } from "../config/regschema.js";


export class RegisLoginModel{

    static async savedData(data){
        const {name,email,password} = data;
      const result =  await  regModel.findOne({email:email})
        const errors = []
            if(result){
              return {
             msg :'Email is already registered',
             data:'',
              }
        }else{
          const newpass = await bcrypt.hash(password,12);
          console.log(newpass);
            const newuser = new regModel({
                name:name,
                email:email,
                password:newpass
            })
            await newuser.save();
            return {
                msg:"User registered",
                data: newpass
            }
    
    }
}
}