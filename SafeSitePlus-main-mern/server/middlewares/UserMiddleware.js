import jwt from 'jsonwebtoken';
import User from '../models/Supervisor.js';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    const decodedData = jwt.verify(token, SECRET_KEY);
    req.userId = decodedData.userId;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};