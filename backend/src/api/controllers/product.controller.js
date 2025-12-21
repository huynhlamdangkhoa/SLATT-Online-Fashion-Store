import { Op } from "sequelize";
import { Product } from "../models/index.js";
import path from "path";
import fs from "fs";

// --- Get products with filters ---
export async function getProducts(req, res) {
    try {
        const { search, page = 1, limit = 12, category, "price[gte]": priceGte, "price[lte]": priceLte, sort } = req.query;
        const where = {};

        if (search) where.name = { [Op.like]: `${search}%` };
        if (category) where.category = category;
        if (priceGte) where.price = { ...where.price, [Op.gte]: parseFloat(priceGte) };
        if (priceLte) where.price = { ...where.price, [Op.lte]: parseFloat(priceLte) };

        const offset = (page - 1) * limit;

        let order = [["name", "ASC"]];
        if (sort) {
            for (const key in sort) {
                const value = sort[key] == -1 ? "DESC" : "ASC";
                order = [[key, value]];
            }
        }

        const { rows, count } = await Product.findAndCountAll({
            where,
            offset,
            limit: +limit,
            order,
        });

        res.status(200).json({
            code: 200,
            status: "success",
            totalCount: count,
            currentPage: +page,
            totalPages: Math.ceil(count / limit),
            data: { products: rows },
        });
    } catch (err) {
        res.status(500).json({ code: 500, status: "error", message: err.message });
    }
}

// --- Create new product ---
export async function createNewProductFromForm(req, res) {
    try {
        const file = req.file;
        const { name, description, category, price, available, stock } = req.body;

        if (!name || !category || !price) {
            return res.status(400).json({ code: 400, status: "error", message: "Name, category, price are required" });
        }

        const imageURL = file ? `/uploads/${file.filename}` : null;

        const product = await Product.create({
            name,
            description,
            category,
            price: parseFloat(price),
            available: available !== undefined ? available : true,
            stock: stock ? parseInt(stock) : 0,
            imageURL,
        });

        res.status(201).json({ code: 201, status: "success", data: { product } });
    } catch (err) {
        res.status(500).json({ code: 500, status: "error", message: err.message });
    }
}

// --- Get single product ---
export async function getProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ code: 404, status: "error", message: "Product not found" });
        res.status(200).json({ code: 200, status: "success", data: { product } });
    } catch (err) {
        res.status(500).json({ code: 500, status: "error", message: err.message });
    }
}

// --- Update product ---
export async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ code: 404, status: "error", message: "Product not found" });

        if (req.file) {
            if (product.imageURL) {
                const oldPath = path.join(process.cwd(), product.imageURL);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            req.body.imageURL = `/uploads/${req.file.filename}`;
        }

        await product.update(req.body);
        res.status(200).json({ code: 200, status: "success", data: { product } });
    } catch (err) {
        res.status(500).json({ code: 500, status: "error", message: err.message });
    }
}

// --- Delete product ---
export async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ code: 404, status: "error", message: "Product not found" });

        if (product.imageURL) {
            const filePath = path.join(process.cwd(), product.imageURL);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await product.destroy();
        res.status(200).json({ code: 200, status: "success", message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ code: 500, status: "error", message: err.message });
    }
}
