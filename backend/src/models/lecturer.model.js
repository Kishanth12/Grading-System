import mongoose, { Mongoose } from 'mongoose'

const lectureSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    lecturerId:{type:String,required:true},
    department:{type:String,required:true},
    assignedSubjects:[{type:mongoose.Schema.Types.ObjectId,ref:"Subject",default:[]}],
    students:[{ type: mongoose.Schema.Types.ObjectId, ref: "Student", default: [] }]
},
    {
        timestamps:true
    }

)

const Lecturer = mongoose.models.Lecturer || mongoose.model("Lecturer",lectureSchema)

export default Lecturer