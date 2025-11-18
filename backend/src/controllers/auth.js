import dotenv from "dotenv";
import User from "../model/User";
import bcryptjs from "bcryptjs";
import { signInValid, signUpValid } from "../validate/auth";
import jwt from "jsonwebtoken";

dotenv.config();

const { SECRET_CODE } = process.env;

export const signUp = async (req, res) => {
  try {
    // valid
    const { error } = signUpValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const { email, firstName, lastName, password, phone } = req.body;

    // kiem tra ton tai
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        message: "Email này đã được đăng ký",
      });
    }
    // ma hoa pass
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    const user = await User.create({
      email,
      fullName: `${firstName} ${lastName}`,
      phone,
      hashedPassword,
    });

    // thong bao dki thanh cong va xoa mk
    user.hashedPassword = undefined;
    return res.status(200).json({
      message: "Dki thanh cong",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    // valid
    const { error } = signInValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // kiem tra ton tai
    const user = await User.findOne({ email: req.body.email }).select(
      "+hashedPassword"
    );
    if (!user) {
      return res.status(400).json({
        message: "Sai tài khoản",
      });
    }

    const isMatch = await bcryptjs.compare(
      req.body.hashedPassword,
      user.hashedPassword
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_CODE, { expiresIn: "30m" });

    user.hashedPassword = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getProfileUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-hashedPassword");
    if (!user) {
      return res.status(400).json({
        message: "Không tìm thấy người dùng",
      });
    }
    return res.status(200).json({
      message: "Lấy thông tin người dùng thành công",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
