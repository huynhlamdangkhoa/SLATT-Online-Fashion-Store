import User from "./user.model.js";
import Product from "./product.model.js";
import Order from "./order.model.js";
import CartItem from "./cartItem.model.js";

/* =======================
   RELATIONSHIPS
======================= */

// User - Order
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// User - CartItem
User.hasMany(CartItem, { foreignKey: "userId" });
CartItem.belongsTo(User, { foreignKey: "userId" });

// Product - CartItem
Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

// Order - CartItem
Order.hasMany(CartItem, { foreignKey: "orderId" });
CartItem.belongsTo(Order, { foreignKey: "orderId" });

export { User, Product, Order, CartItem };
