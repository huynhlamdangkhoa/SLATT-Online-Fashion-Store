import jwt from "jsonwebtoken";

import { appConfig } from "../config/index.js";

// Generate Token and set to Cookie
export function generateTokenAndSetCookie(res, userId) {
	const token = jwt.sign({ userId }, appConfig.secret, { expiresIn: "7d" }); // 7 days

	res.cookie("token", token, {
		httpOnly: true,
		secure: appConfig.env === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});

	return token;
}
