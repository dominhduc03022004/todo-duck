import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/User.js";
dotenv.config();

const { SECRET_CODE } = process.env;

export const checkAuth = async (req, res, next) => {
  try {
    // kiem tra ng dung dn chua
    const token = req.headers.authorization?.split(" ")[1];
    // kiem tra token
    if (!token) {
      return res.status(400).json({
        message: "Chưa đăng nhập",
      });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_CODE);
      console.log("decoded: ", decoded);
    } catch (error) {
      return res.status(400).json({
        message: "Token Không hợp lệ hoặc hết hạn",
      });
    }
    const user = await User.findById(decoded.id);
    if(!user) {
      return res.status(400).json({
        message: "User không tồn tại"
      });
    }
    req.userId = user._id;
    req.user = user
    next();
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
