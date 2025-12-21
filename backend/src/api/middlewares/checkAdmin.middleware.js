import { User } from "../models/index.js";

export async function checkAdmin(req, res, next) {
    const userId = req.userId;

    try {
        const currentUser = await User.findOne({ _id: userId });

        if (!currentUser) {
            res.status(404).json({
                code: 404,
                status: "fail",
                message: "User not found",
            });
            return;
        }

        if (currentUser && currentUser.role != "admin") {
            res.status(400).json({
                code: 400,
                status: "fail",
                message: "User is unauthorized",
            });
            return;
        }

        next();
    } catch (err) {
        res.status(500).json({
            code: 500,
            status: "error",
            message: err.message,
        });
    }
}
