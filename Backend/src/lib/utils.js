import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7days in miliSeconds
    httpOnly: true, // prevent xss attacks : cross-type scripting
    sameSite: "strict", // prevent CSRF attacks : cross-site request forgery
    secure: process.env.NODE_ENV === "developement" ? false : true, // only send cookie over https in production
  });

  return token;
};
