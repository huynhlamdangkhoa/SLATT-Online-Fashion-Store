import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    secret: process.env.SECRET || "",
    clientURL: process.env.CLIENT_URL || "",
    adminEmail: process.env.ADMIN_EMAIL || "",
    adminPassword: process.env.ADMIN_PASSWORD || "",
    adminPhoneNumber: process.env.ADMIN_PHONE_NUMBER || "",
};
