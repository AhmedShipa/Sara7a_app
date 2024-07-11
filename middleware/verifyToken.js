import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  let [key, token] = req.headers.token.split(" ");

  jwt.verify(token, "secretKeyToken", (err, decoded) => {
    if (err) return res.json({ message: `invalid token` });
    req.receiverId = decoded;
    next();
  });
};
