import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    student:{type:mongoose.Schema.Types.ObjectId,ref:"Student",required:true},
    subject:{type:mongoose.Schema.Types.ObjectId,ref:"Subject",required:true},
    lecturer:{type:mongoose.Schema.Types.ObjectId,ref:"Lecturer",required:true},
    marks:{
        assignment: { type: Number, required: true, min: 0, max: 100 },
         finalExam: { type: Number, required: true, min: 0, max: 100 }
    },
    gradeLetter:{type:String,required:true},
    gpaPoint: {type: Number,required: true,min: 0,max: 4.0},
},{timestamps:true})

const Grade = mongoose.models.Grade || mongoose.model("Grade",gradeSchema)

export default Grade