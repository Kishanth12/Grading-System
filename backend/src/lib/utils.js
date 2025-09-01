import jwt from "jsonwebtoken";

const generateToken = (userId, role, res) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,                  // prevent JS access
    sameSite:"lax", 
    secure: false
  });

  return token;
};

export default generateToken;
