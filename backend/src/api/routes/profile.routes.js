import express from "express";
import { verifyToken } from "../middlewares/index.js";
import { profileController } from "../controllers/index.js";

const profileRouter = express.Router();

profileRouter.route("/").get(verifyToken, profileController.getUserProfile);

profileRouter.route("/").patch(verifyToken, profileController.updateUserProfile);

export default profileRouter;
