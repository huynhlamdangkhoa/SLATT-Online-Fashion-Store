import { User } from "../models/index.js";
import { Op } from "sequelize";

/**
 * GET USER PROFILE
 */
export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: [
          "password",
          "resetPasswordToken",
          "resetPasswordExpiresAt",
          "verificationToken",
          "verificationTokenExpiresAt",
        ],
      },
    });

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
        userProfile: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 * UPDATE USER PROFILE
 */
export const updateUserProfile = async (req, res) => {
  const userId = req.userId;
  const { fullName, phoneNumber, address } = req.body;

  try {
    const updates = {};

    if (fullName) updates.fullName = fullName;
    if (phoneNumber) updates.phoneNumber = phoneNumber;
    if (address) updates.address = address;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        code: 400,
        status: "fail",
        message: "No fields provided for update",
      });
    }

    /**
     * Check phone number duplicate
     */
    if (updates.phoneNumber) {
      const existingUser = await User.findOne({
        where: {
          phoneNumber: updates.phoneNumber,
          id: { [Op.ne]: userId },
        },
      });

      if (existingUser) {
        return res.status(409).json({
          code: 409,
          status: "fail",
          message: "Phone number is already in use",
        });
      }
    }

    const [updatedRows] = await User.update(updates, {
      where: { id: userId },
      validate: true,
    });

    if (updatedRows === 0) {
      return res.status(404).json({
        code: 404,
        status: "fail",
        message: "User not found",
      });
    }

    const updatedUser = await User.findByPk(userId, {
      attributes: {
        exclude: [
          "password",
          "resetPasswordToken",
          "resetPasswordExpiresAt",
          "verificationToken",
          "verificationTokenExpiresAt",
        ],
      },
    });

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Profile updated successfully",
      data: {
        userProfile: updatedUser,
      },
    });
  } catch (err) {
    /**
     * Sequelize validation error
     */
    if (err.name === "SequelizeValidationError") {
      const validationErrors = err.errors.map((e) => e.message);
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Validation Failed",
        errors: validationErrors,
      });
    }

    /**
     * Sequelize unique constraint error
     */
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        code: 409,
        status: "error",
        message: "Phone number is already in use",
      });
    }

    res.status(500).json({
      code: 500,
      status: "error",
      message: err.message,
    });
  }
};
