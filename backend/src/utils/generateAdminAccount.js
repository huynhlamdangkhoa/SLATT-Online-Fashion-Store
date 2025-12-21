import brcypt from "bcrypt";

import { Order, User } from "../api/models/index.js";
import { appConfig } from "../config/index.js";

export async function generateAdminAccount() {
    try {
        const admin = await User.findOne({ email: appConfig.adminEmail });

        if (admin) {
            console.error("Admin account already created");
            return;
        }

        const hashedPassword = await brcypt.hash(appConfig.adminPassword, 12);

        const newAdmin = await User.create({
            email: appConfig.adminEmail,
            phoneNumber: appConfig.adminPhoneNumber,
            fullName: "Admin",
            password: hashedPassword,
            role: "admin",
            isVerified: true,
        });

        await Order.create({
            amount: 0,
            totalAmount: 0,
            discount: 0,
            orderStatus: "pending",
            address: "",
            user: newAdmin,
        });

        console.log("Create admin account successfully");
    } catch (err) {
        console.error(err.message);
    }
}
