import { Order, CartItem, Product, User } from "../models/index.js";
import { Op } from "sequelize";

// Get orders for logged-in user
export const getOrdersByUser = async (req, res) => {
  const userId = req.userId;
  try {
    const orders = await Order.findAll({
      where: { userId, orderStatus: { [Op.in]: ["placed", "shipped", "delivered"] } },
      include: [{ model: CartItem, include: [Product] }],
      order: [["placedTime", "DESC"]],
    });

    res.status(200).json({ code: 200, status: "success", data: { orders } });
  } catch (err) {
    res.status(500).json({ code: 500, status: "error", message: err.message });
  }
};

// Place order from pending cart
export const placeTheOrder = async (req, res) => {
  try {
    const userId = req.userId;

    // Find the pending order
    const order = await Order.findOne({
      where: { userId, orderStatus: "pending" },
      include: [{ model: CartItem, include: [Product] }],
    });

    if (!order)
      return res.status(404).json({ code: 404, status: "fail", message: "Active order not found" });

    const items = order.CartItems;
    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // Update order
    await order.update({
      orderStatus: "placed",
      placedTime: new Date(),
      totalQuantity,
      totalAmount,
      amount: totalAmount,
    });

    res.status(200).json({ code: 200, status: "success", data: { order } });
  } catch (err) {
    res.status(500).json({ code: 500, status: "error", message: err.message });
  }
};

// Admin: get all orders
export const getAllOrdersFromUsers = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [User, { model: CartItem, include: [Product] }],
      order: [["placedTime", "DESC"]],
    });
    res.status(200).json({ code: 200, status: "success", data: { orders } });
  } catch (err) {
    res.status(500).json({ code: 500, status: "error", message: err.message });
  }
};
