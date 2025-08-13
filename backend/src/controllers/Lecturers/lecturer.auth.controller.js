import Lecturer from '../../models/lecturer.model.js';
import User from './../../models/user.model.js';

//login
export const login=async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user =await User.findOne({email, role:"lecturer"})
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
       console.log("Error in Lecturer login controller",error.message)
       return res.status(500).json({message:"Internal server error"})
    }
}


//get profile
export const profile=async(req,res)=>{
    try {
    const id = req.user._id;
    const lecturer = await Lecturer.findById(id)
    .select("userId")
    .populate({
        path:"userId",
      select:"fullName email profilePic"
    })
    if(!lecturer){
        return res.status(404).json({message:"User not found"})    
    }
    res.status(200).json({lecturer})
    } catch (error) {
    console.log("Error in Lecturer controller",error.message)
    return res.status(500).json({message:"Internal server error"})
    }
}
