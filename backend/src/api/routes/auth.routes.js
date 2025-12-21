import express from "express";
import { authController } from "../controllers/index.js";
import { verifyToken } from "../middlewares/index.js";


const authRouter = express.Router();

authRouter.route("/auth-check")
    .get(verifyToken, authController.checkAuth);

authRouter.route("/signup")
    .post(authController.signup);

authRouter.route("/signin")
    .post(authController.signin);

authRouter.route("/signout")
    .post(verifyToken, authController.signout);

authRouter.route("/password-forgot")
    .post(authController.forgotPassword);


export default authRouter;
