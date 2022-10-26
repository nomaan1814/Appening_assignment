const express=require('express');
const app=express();
const connectDb=require('./db')
connectDb()
const port=5000;
require('dotenv').config({path:`${__dirname}/.env`});

app.use(express.json())
const userRoutes=require('./routes/userRoutes');
app.use("/api/user",userRoutes)
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})