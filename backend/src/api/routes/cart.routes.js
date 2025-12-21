import express from "express";
import { verifyToken } from "../middlewares/index.js";
import { cartController } from "../controllers/index.js";

const cartRouter = express.Router();

// Lấy danh sách cart items
cartRouter.get("/", verifyToken, cartController.getCartItems);

// Thêm sản phẩm vào cart
cartRouter.post("/:productId", verifyToken, cartController.addProductToCart);

// Tăng / giảm số lượng sản phẩm trong cart
cartRouter.post("/increase/:productId", verifyToken, cartController.increaseProductQuantity);
cartRouter.post("/decrease/:productId", verifyToken, cartController.decreaseProductQuantity);

// Xóa cart item
cartRouter.delete("/item/:cartItemId", verifyToken, cartController.deleteProductFromCart);

export default cartRouter;
