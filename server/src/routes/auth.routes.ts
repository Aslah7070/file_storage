import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/implementation/auth.service";
import express from "express"



const authService = new AuthService();

// inject service into controller
const authController = new AuthController(authService);

const auth=express.Router()


 


auth
.post("/signup",authController.signup.bind(authController))
.post("/login",authController.login.bind(authController))

export {auth}