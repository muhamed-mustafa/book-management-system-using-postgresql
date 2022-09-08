import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId, email) => {
  let token = jwt.sign({ userId, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  return token;
};

const verifyToken = (req, _res, next) => {
  const { token } = req.headers;
  console.log(process.env.JWT_SECRET);
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = {
    userId: decoded.userId,
    email: decoded.email,
  };

  next();
};

export { generateToken, verifyToken };
