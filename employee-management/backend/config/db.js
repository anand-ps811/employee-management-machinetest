const mongoose = require('mongoose');


const connectDB= async ()=>{
     try{
        await mongoose.connect(process.env.CONNECTION_STRING)

        console.log('database connected...');

     }
     catch(error){
        console.error('mongoDB conecton error ',error)
        process.exit(1);
     }
}

module.exports=connectDB;