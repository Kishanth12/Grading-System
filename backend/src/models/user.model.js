import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    profilePic:{type:String,default:""},
    role:{type:String,enum:["admin","student","lecturer"],required:true}},
    {
        timestamps:true,
    }
)

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User;