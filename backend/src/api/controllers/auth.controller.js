import bcrypt from "bcrypt";

import { User, Order } from "../models/index.js";
import { generateTokenAndSetCookie } 
  from "../../utils/generateTokenAndSetCookie.js";


/* ===================== SIGN UP ===================== */
export async function signup(req, res) {
  const { fullName, phoneNumber, email, password, confirmPassword } = req.body;

  try {
    if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
      return res.status(400).json({
        code: 400,
        status: "fail",
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        code: 400,
        status: "fail",
        message: "Passwords do not match",
      });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        code: 400,
        status: "fail",
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      fullName,
      phoneNumber,
      email: email.toLowerCase(),
      password: hashedPassword,
      isVerified: true, // ✅ auto verified
    });

    // tạo order mặc định
    await Order.create({
      userId: newUser.id,
      amount: 0,
      totalAmount: 0,
      discount: 0,
      orderStatus: "pending",
      address: "",
    });

    generateTokenAndSetCookie(res, newUser.id);

    res.status(201).json({
      code: 201,
      status: "success",
      data: {
        user: {
          ...newUser.toJSON(),
          password: undefined,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: err.message,
    });
  }
}

/* ===================== SIGN IN ===================== */
export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        code: 400,
        status: "fail",
        message: "Email or password is incorrect",
      });
    }

    generateTokenAndSetCookie(res, user.id);
    await user.update({ lastLogin: new Date() });

    res.status(200).json({
      code: 200,
      status: "success",
      data: {
        user: {
          ...user.toJSON(),
          password: undefined,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: err.message,
    });
  }
}

/* ===================== CHECK AUTH ===================== */
export async function checkAuth(req, res) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        code: 401,
        status: "fail",
        message: "Unauthorized",
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        code: 404,
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      code: 200,
      status: "success",
      data: {
        user: {
          ...user.toJSON(),
          password: undefined,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: err.message,
    });
  }
}

/* ===================== SIGN OUT ===================== */
export function signout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    code: 200,
    status: "success",
    message: "Signed out",
  });
}

/* ===================== FORGOT PASSWORD ===================== */
export async function forgotPassword(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await user.update({ password: hashedPassword });

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
