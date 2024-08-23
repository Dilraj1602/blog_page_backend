
const express = require('express');
const app = express();

require('dotenv').config();

const PORT=process.env.PORT || 3000;
app.use(express.json()); 

const blog=require('./routes/blog');

app.use('/api/v1',blog);

const connectDB = require('./config/database');
connectDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send('Hello World');
})