import generateToken from "../../lib/utils";
import User from "../../models/user.model";
import bcrypt from 'bcrypt'

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
//delete Student
//update student
//add lecturer
//delete lecturer
//update lecturer