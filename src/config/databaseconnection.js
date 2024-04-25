import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


// const { MongoClient, ServerApiVersion } = require('mongodb');



export const connectdb = async()=>{
    // console.log(process.env.MongoUri)
   await mongoose.connect(process.env.Mongourl).then(()=>{
        console.log("db is connected")
    })
    .catch((err)=>{
        console.log(err);
    })
}