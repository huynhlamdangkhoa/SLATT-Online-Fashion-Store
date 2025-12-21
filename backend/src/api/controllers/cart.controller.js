import { CartItem, Product, Order } from "../models/index.js";

// Lấy hoặc tạo đơn hàng pending
const getOrCreateActiveOrder = async (userId) => {
  let order = await Order.findOne({
    where: { userId, orderStatus: "pending" },
    include: [{ model: CartItem, include: [Product] }],
  });

  if (!order) {
    order = await Order.create({ userId, orderStatus: "pending", amount: 0, totalAmount: 0 });
    await order.reload({ include: [{ model: CartItem, include: [Product] }] });
  }

  return order;
};

// Lấy danh sách cart items
export const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res.status(401).json({ code: 401, status: "fail", message: "Unauthorized" });

    const activeOrder = await getOrCreateActiveOrder(userId);

    res.status(200).json({
      code: 200,
      status: "success",
      data: { cartItems: activeOrder.CartItems, activeOrder },
    });
  } catch (err) {
    console.error("getCartItems error:", err);
    res.status(500).json({ code: 500, status: "error", message: err.message });
  }
};

// Thêm sản phẩm vào cart
export const addProductToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = parseInt(req.params.productId, 10);
    if (!userId)
      return res.status(401).json({ code: 401, status: "fail", message: "Unauthorized" });

    const product = await Product.findByPk(productId);
    if (!product)
      return res.status(404).json({ code: 404, status: "fail", message: "Product not found" });

    const activeOrder = await getOrCreateActiveOrder(userId);

    // Nếu sản phẩm đã có trong cart → tăng quantity
    let cartItem = await CartItem.findOne({ where: { orderId: activeOrder.id, productId } });
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        orderId: activeOrder.id,
        productId,
        userId,
        price: product.price,
        quantity: 1,
      });
    }

    // Cập nhật tổng tiền
    const items = await CartItem.findAll({ where: { orderId: activeOrder.id } });
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await activeOrder.update({ amount: totalAmount, totalAmount });

    await cartItem.reload({ include: [Product] });

    res.status(200).json({ code: 200, status: "success", data: { cartItem, activeOrder } });
  } catch (err) {
    console.error("addProductToCart error:", err);
    res.status(500).json({ code: 500, status: "error", message: err.message });
  }
};

// Tăng số lượng sản phẩm
export const increaseProductQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = parseInt(req.params.productId, 10);

    const activeOrder = await getOrCreateActiveOrder(userId);
    const item = await CartItem.findOne({ where: { orderId: activeOrder.id, productId } });

    if (!item)
      return res.status(404).json({ code: 404, status: "fail", message: "Cart item not found" });

    item.quantity += 1;
    await item.save();

    const items = await CartItem.findAll({ where: { orderId: activeOrder.id } });
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await activeOrder.update({ amount: totalAmount, totalAmount });

    await item.reload({ include: [Product] });

    res.status(200).json({ code: 200, status: "success", data: { item, activeOrder } });
  } catch (err) {
    res.status(500).json({ code: 500, status: "error", message: err.message });
  }
};

// Giảm số lượng sản phẩm
export const decreaseProductQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = parseInt(req.params.productId, 10);

    const activeOrder = await getOrCreateActiveOrder(userId);
    const item = await CartItem.findOne({ where: { orderId: activeOrder.id, productId } });

    if (!item)
      return res.status(404).json({ code: 404, status: "fail", message: "Cart item not found" });

    if (item.quantity <= 1) {
      await item.destroy();
    } else {
      item.quantity -= 1;
      await item.save();
    }

    const items = await CartItem.findAll({ where: { orderId: activeOrder.id } });
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    await activeOrder.update({ amount: totalAmount, totalAmount });

    if (item.quantity > 0) await item.reload({ include: [Product] });

    res.status(200).json({ code: 200, status: "success", data: { item, activeOrder } });
  } catch (err) {
    res.status(500).json({ code: 500, status: "error", message: err.message });
  }
};

// Xóa sản phẩm khỏi cart
export const deleteProductFromCart = async (req, res) => {
  try {
    const cartItemId = parseInt(req.params.cartItemId, 10);
    const item = await CartItem.findByPk(cartItemId);
    if (!item)
      return res.status(404).json({ code: 404, status: "fail", message: "Cart item not found" });

    const activeOrder = await Order.findByPk(item.orderId);
    if (activeOrder) {
      await item.destroy();
      const items = await CartItem.findAll({ where: { orderId: activeOrder.id } });
      const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      await activeOrder.update({ amount: totalAmount, totalAmount });
    }

    res.status(200).json({ code: 200, status: "success", message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ code: 500, status: "error", message: err.message });
  }
};
