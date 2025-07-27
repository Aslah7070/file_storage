import { NextFunction, Request, Response } from "express";
import { IFlieService } from "../services/interfaces/IFlileService";
import { IFileController } from "./interface/file.interface";
import { HttpStatus } from "../constants/status.constants";



export class FileController implements IFileController{
      constructor(private _fileService: IFlieService) {}

       async uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?.id; 
    const file = req.file;
console.log(file,"dilessss")
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const result = await this._fileService.uploadFile(userId, [file]); 

    res.status(result.statuscode).json(result);
  } catch (error) {
    next(error); 
  }
}
   async deleteFile(req: Request, res: Response, next: NextFunction): Promise<void> {
    const fileId = req.params.id;
   try {
      const result = await this._fileService.deleteFile(fileId);


      if (!result.success) {
         res.status(result.statuscode).json({
          success: false,
          message: result.message,
        
        });
        return
      }

       res.status(result.statuscode).json({
        success: result.success,
        message: result.message
      });
    } catch (err) {
       res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error',
        error: err,
      });
}
   }

}