import express from "express";
import { verifyToken } from "../middlewares/index.js";
import { orderController } from "../controllers/index.js";

const orderRouter = express.Router();

orderRouter.route("/").post(verifyToken, orderController.placeTheOrder);

orderRouter.route("/").get(verifyToken, orderController.getOrdersByUser);

orderRouter.route("/admin").get(verifyToken, orderController.getAllOrdersFromUsers);

export default orderRouter;
