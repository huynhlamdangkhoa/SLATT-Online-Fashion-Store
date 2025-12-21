import jwt from "jsonwebtoken";

import { appConfig } from "../../config/index.js";

export function verifyToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({
            code: 401,
            status: "fail",
            message: "Unauthorized - no token provided",
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, appConfig.secret);
        if (!decoded) {
            res.status(401).json({
                code: 401,
                status: "fail",
                message: "Unauthorized - invalid token",
            });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log("Error in verifyToken ", err);
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
        return;
    }
}
