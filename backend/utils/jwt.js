import jwt from "jsonwebtoken";

export const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};
