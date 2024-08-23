

const mongoose = require('mongoose');
require('dotenv').config();
const connectDB =async(req,res)=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log('Database connected');
    }).catch((err)=>{
        console.log("Not connected");
        console.log(err);
    })
}

module.exports = connectDB;