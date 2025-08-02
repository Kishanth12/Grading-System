import generateToken from "../../lib/utils.js";
import User from "../../models/user.model.js";
import bcrypt from 'bcrypt'
import Subject from './../../models/subject.model';

//admin login
export const adminLogin = async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user =await User.findOne({email, role:"admin"})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isPasswordCorrect= await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"})
        }
        generateToken(user._id,res)

        
    res.status(200).json({
      _id:user._id,
      fullName: user.fullName,
      role:user.role,
      email: user.email,
      profilePic :user.profilePic,

  });
    } catch (error) {
       console.log("Error in login controller",error.message)
       return res.status(500).json({message:"Internal server error"})
    }
}


//logout
export const logout= async(req,res)=>{
    try {
        res.cookie('jwt','',{maxAge:0})
        res.status(200).json({message:"logout successfully"})
    } catch (error) {
        console.log("Error in login controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}

//add student

export const addStudent=async(req,res)=>{
    try {
        const{userId}=req.params
        const{admissionNo,batch,department}= req.body;
    const user= await User.findOne({userId})
    if(!existUser){
     return res.status(400).json({message:"User Not Found"})
    }
    if (user.role !== 'student') {
      return res.status(400).json({ message: 'User role is not student' });
    }
    if(!admissionNo|| !batch || !department)
      {
        return res.status(400).json({message:"All fields are required"})
      }
    
    const existingStudent = await Student.findOne({ userId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student details already added' });
    }
    const subjects = await Subject.find({ department, batch });
    const subjectIds = subjects.map((subj) => subj._id);

    const newStudent = new Student({
      userId,
      admissionNo,
      batch,
      department,
      subjects: subjectIds, 
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student details added', student: newStudent });

    } catch (error) {
      console.log("Error in addStudent controller",error.message)
        return res.status(500).json({message:"Internal server error"})  
    }

}
//delete Student
//update student
//add lecturer
export const addLecture= async(req,res)=> {
    
}
//delete lecturer
//update lecturer