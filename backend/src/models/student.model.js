import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    admissionNo:{type:String,required:true,unique:true},
    batch:{type:String,required:true},
    department:{type:String,required:true},
    subjects:[{type:mongoose.Schema.Types.ObjectId,ref:"Subject"}],
    grade:[{type:mongoose.Schema.Types.ObjectId,ref:"Grade"}],
},{
    timestamps:true
})

const Student = mongoose.models.Student || mongoose.model("Student",studentSchema)

export default Student;
