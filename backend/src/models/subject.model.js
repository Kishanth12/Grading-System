import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subCode:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    credit:{type:Number,required:true},
    semester:{type:String,required:true},
    department:{type:String,required:true},
    lecturer:{type:mongoose.Schema.Types.ObjectId,ref:"Lecturer"},
    schedule: {
    day: String,          
    startTime: String,   
    endTime: String       
  }
},{
    timestamps:true
})

const Subject = mongoose.models.Subject || mongoose.model("Subject",subjectSchema)

export default Subject;