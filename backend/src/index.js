import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './lib/db.js';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes.js'
import cors from 'cors'
import lecturerRoutes from './routes/lecturerRoutes.js'
import studentRoutes from './routes/studentRoutes.js'

const app= express();
dotenv.config();
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))


app.use('/api/admin',adminRoutes)
app.use('/api/lecturer',lecturerRoutes)
app.use('/api/student',studentRoutes)


app.listen(PORT,()=>{
    console.log("server is running on:"+ PORT);
    connectDb();
})