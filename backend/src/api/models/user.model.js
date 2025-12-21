import { DataTypes } from "sequelize";
import validator from "validator";
import { sequelize } from "../../config/db/mysql.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid email format",
        },
      },
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isValidPhone(value) {
          if (!validator.isMobilePhone(value, "any")) {
            throw new Error("Invalid phone number");
          }
        },
      },
    },

    fullName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg: "Full name must be between 2 and 50 characters",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isStrongPassword(value) {
          const hasUpper = /[A-Z]/.test(value);
          const hasLower = /[a-z]/.test(value);
          const hasNumber = /\d/.test(value);
          const hasSpecial = /[^A-Za-z0-9]/.test(value);

          if (!(hasUpper && hasLower && hasNumber && hasSpecial)) {
            throw new Error(
              "Password must contain uppercase, lowercase, number, and special character"
            );
          }
        },
        len: {
          args: [6],
          msg: "Password must be at least 6 characters",
        },
      },
    },

    role: {
      type: DataTypes.ENUM("customer", "admin"),
      defaultValue: "customer",
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
