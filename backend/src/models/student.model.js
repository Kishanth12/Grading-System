import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    admissionNo:{type:String,required:true,unique:true},
    batch:{type:String,required:true},
    department:{type:String,required:true},
    subjects:[{type:mongoose.Schema.Types.ObjectId,ref:"Subject",default: []}],
    grades:[{type:mongoose.Schema.Types.ObjectId,ref:"Grade",default: []}],
    totalGpaPoint: {type: Number,min: 0,max: 4.0,default:0}
},{
    timestamps:true
})

const Student = mongoose.models.Student || mongoose.model("Student",studentSchema)

export default Student;
