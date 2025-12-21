import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import { appConfig, connectDB } from "./config/index.js";
import { authRouter, productRouter, cartRouter, profileRouter, orderRouter } from "./api/routes/index.js";

const app = express();

// up ảnh
app.use("/uploads", express.static("uploads"));

// Middlewares
app.use(cors({ origin: appConfig.clientURL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/order", orderRouter);

// Swagger
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Sweety Bakery API",
            version: "1.0.0",
            description: "API documentation using Swagger",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./api/routes/*.routes.js"], // files containing annotations as above
};

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));

await connectDB();

export default app;
