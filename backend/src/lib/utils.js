import jwt from 'jsonwebtoken'

const generateToken = (userId,role,res)=>{
    const token = jwt.sign({userId,role},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })

    res.cookie('jwt',token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"lax",
        secure: false,
    })
    return token
}
export default generateToken;