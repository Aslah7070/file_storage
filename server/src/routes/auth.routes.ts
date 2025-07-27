import { AuthController } from "../controllers/auth.controller";
import { userAuth } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/file.middleware";
import { AuthService } from "../services/implementation/auth.service";
import express from "express"



const authService = new AuthService();

// inject service into controller
const authController = new AuthController(authService);

const auth=express.Router()


 


auth
.post("/signup",authController.signup.bind(authController))
.post("/login",authController.login.bind(authController))
.post("/logout",userAuth,authController.logout.bind(authController))
// .post("/upload",userAuth,upload.single('image'),authController.uploadFile.bind(authController))

export {auth}