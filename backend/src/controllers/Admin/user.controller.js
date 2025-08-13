import generateToken from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from 'bcrypt'
import cloudinary from './../../lib/cloudinary.js';
import validator from 'validator'
import Lecturer from "./../../models/lecturer.model.js";
import Student from "../../models/student.model.js";


//register for user
export const register = async(req,res)=>{
    try {
        const {fullName,email,password,role}= req.body;
        if(!fullName || !email || !password || !role || !req.file){
        return res.status(400).json({message :"All fields are required"})
      }
      if (password.length <6){
        return res.status(400).json({message:"password is to short"})
      }
      if(!validator.isEmail(email)){
        return res.status(500).json({success:false,message:"Please enter a valid Email"})
     }

      const existingUser = await User.findOne({email})
      if(existingUser){
        return res.status(400).json({message:"User Already Exists"})
      }

      //hashPassword
      const salt= await bcrypt.genSalt(10)
      const hashedPassword= await bcrypt.hash(password,salt)

      //uploadPic
      const uploaderResponse = await cloudinary.uploader.upload(req.file.path)
      if(!uploaderResponse){
        return res.status(400).json({message:"error in upload profilePic"})
      }

      const newUser= new User({
        fullName,
        email,
        password:hashedPassword,
        role,
        profilePic:uploaderResponse.secure_url
      })

      if(newUser){
        await newUser.save();
        generateToken(newUser._id,res)

         res.status(200).json({
            _id:newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            role:newUser.role,
            profilePic :newUser.profilePic,
         })
      }else{
        return res.status(400).json({message:"invalid user data"})
      }
    } catch (error) {
       console.log("Error in register controller",error.message)
       return res.status(500).json({message:"Internal server Error"})
    }
}


//update user
export const updateUser= async(req,res)=>{
    try {
        const userId=req.params.id;
        const user = await User.findOne({_id:userId})
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
         user.fullName = req.body.fullName || user.fullName;
         user.email = req.body.email || user.email;
         user.role = req.body.role || user.role;
        
         if (req.body.password) {
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(req.body.password, salt);
        }

        if (req.body.profilePic) {
        const uploadRes = await cloudinary.uploader.upload(req.body.profilePic);
        user.profilePic = uploadRes.secure_url;
        }
        const updatedUser = await user.save();
        
       res.status(200).json({ message: "User updated successfully",
       user: {
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic,
      },
    })       

    } catch (error) {
       console.log("Error updating user profile:", error.message);
       res.status(500).json({ message: "Server error" });
    }
}

//admin info
export const adminInfo = async(req,res)=>{
  try {
    const adminId = req.user._id;
    const admin = await User.find({_id:adminId});
    if(!admin){
      return res.status(404).json({message:"Not Found"})
    }
    res.status(200).json({admin})

  } catch (error) {
    console.log("Error in  admin profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// lecturerInfo
export const lecturerInfo = async(req,res)=>{
  try {
    const{id} = req.params;
    const lecturer= await Lecturer.findById(id).populate("userId","fullName email password profilePic")
    if(!lecturer){
      return res.status(404).json({message:"Not Found"})
    }
    res.status(200).json({lecturer})
  } catch (error) {
    console.log("Error in lecturer profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// StudentInfo
export const studentInfo = async(req,res)=>{
  try {
    const{id} = req.params;
    const student= await Student.findById(id).populate("userId","fullName email password profilePic")
    if(!student){
      return res.status(404).json({message:"Not Found"})
    }
    res.status(200).json({student})
  } catch (error) {
    console.log("Error in Student profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}