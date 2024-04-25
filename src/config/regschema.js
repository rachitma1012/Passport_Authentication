import mongoose from 'mongoose';

const regSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:["Password is required"]
    },
      date:{
        type:Date,
        default: Date.now()
      }  
    
})

export const regModel = mongoose.model('register',regSchema);


// min:[8,"Password must be at least 8 characters long"], // Minimum length of 8 characters
// max:[30,"Password must not exceed 30 characters"], // Maximum length of 30 characters
// match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,"Password must contain at least one lowercase letter, one uppercase letter, and one digit"], // Must contain at least one lowercase letter, one uppercase letter, and one digit