import express from "express";
import { productController } from "../controllers/index.js";
import { checkAdmin, verifyToken } from "../middlewares/index.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const productRouter = express.Router();

// Tạo folder uploads nếu chưa có
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// /api/v1/products
productRouter
    .route("/")
    .get(productController.getProducts)
    .post(
        verifyToken,
        checkAdmin,
        upload.single("image"), 
        productController.createNewProductFromForm
    );

// /api/v1/products/:id
productRouter
    .route("/:id")
    .get(productController.getProduct)
    .patch(
        verifyToken,
        checkAdmin,
        upload.single("image"),
        productController.updateProduct
    )
    .delete(verifyToken, checkAdmin, productController.deleteProduct);

export default productRouter;
