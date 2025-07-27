import { Request, Response, NextFunction } from "express";

export interface IFileController {

  uploadFile(req: Request, res: Response, next: NextFunction): Promise<void>;
}   