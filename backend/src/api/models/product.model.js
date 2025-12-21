import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db/mysql.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
    },

    category: {
      type: DataTypes.STRING,
    },

    imageURL: {
      type: DataTypes.STRING,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
