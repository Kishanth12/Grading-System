import User from './../models/user.model.js';
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id,user.role,res)

    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const checkAuth=(req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller",error.message)
    return res.status(500).json({message:"Internal server Error"})
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