import { AuthController } from "../controllers/auth.controller";
import { userAuth } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/file.middleware";

import express from "express"
import { FileService } from "../services/implementation/file.service";
import { FileController } from "../controllers/file.controller";



const fileService = new FileService() 

// inject service into controller
const fileController = new FileController(fileService);

const file=express.Router()


  


file

.post("/upload",userAuth,upload.single('image'),fileController.uploadFile.bind(fileController))
.post("/delete/:id",userAuth,fileController.deleteFile.bind(fileController))
.get("/find",userAuth,fileController.findFilesByContentType.bind(fileController))

export {file}