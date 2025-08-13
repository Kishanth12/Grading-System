import User from './../../models/user.model.js';

//login
export const login=async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user =await User.findOne({email, role:"student"})
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
       console.log("Error in Student login controller",error.message)
       return res.status(500).json({message:"Internal server error"})
    }
}