import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db/mysql.js";
import { v4 as uuidv4 } from "uuid";

const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    orderDescription: { type: DataTypes.STRING },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    orderStatus: { type: DataTypes.ENUM("pending", "placed", "shipped", "delivered"), allowNull: false, defaultValue: "pending" },
    address: { type: DataTypes.STRING, defaultValue: "" },
    totalAmount: { type: DataTypes.FLOAT },
    discount: { type: DataTypes.FLOAT, defaultValue: 0 },
    trackingId: { type: DataTypes.STRING, defaultValue: () => uuidv4(), unique: true },
    placedTime: { type: DataTypes.DATE },
    totalQuantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { tableName: "orders", timestamps: true }
);

export default Order;
