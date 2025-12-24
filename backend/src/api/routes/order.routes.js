import express from "express";
import { verifyToken } from "../middlewares/index.js";
import { orderController } from "../controllers/index.js";

const orderRouter = express.Router();

// Place an order
orderRouter.route("/").post(verifyToken, orderController.placeTheOrder);

// Get orders for current user
orderRouter.route("/").get(verifyToken, orderController.getOrdersByUser);

// Admin: get all orders
orderRouter.route("/admin").get(verifyToken, orderController.getAllOrdersFromUsers);

export default orderRouter;
