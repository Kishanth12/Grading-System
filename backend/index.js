import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './src/lib/db';
import cookieParser from 'cookie-parser';



dotenv.config();
const app = process.env.PORT
app.use(express.json())
app.use(cookieParser())

app.listen(PORT,()=>{
    console.log("server is running on:"+ PORT);
    connectDb();
})