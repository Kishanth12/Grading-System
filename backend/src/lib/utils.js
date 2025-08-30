import jwt from "jsonwebtoken";

const generateToken = (userId, role, res) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // check environment
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,                  // prevent JS access
    sameSite: isProduction ? "none" : "lax", // "none" needed for cross-site in prod
    secure: isProduction,            // must be true in prod (HTTPS)
  });

  return token;
};

export default generateToken;
